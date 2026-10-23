/* Daily inventory log: beginning / used / ending per item per day, plus a small .xlsx writer.
   Used = automatic (cups and lids from sales) + manual entries. Beginning and ending can be typed over. */
(function () {
  var KEY = 'marinabays_invlog_v1', D = window.MBData, S = window.MBShift;
  function load() { try { var v = JSON.parse(localStorage.getItem(KEY)); if (v && v.days) return v; } catch (e) {} return { days: {} }; }
  var log = load();
  function save() { try { localStorage.setItem(KEY, JSON.stringify(log)); return true; } catch (e) { return false; } }
  function rec(date, id, make) { var d = log.days[date]; if (!d) { if (!make) return null; d = log.days[date] = {}; } var r = d[id]; if (!r && make) r = d[id] = { man: [] }; return r || null; }
  function items() { return D.getInventory().items || []; }
  function autoUsed(date) {
    var x = S.day(date), m = {};
    [x.cups, x.lids].forEach(function (o) { Object.keys(o || {}).forEach(function (k) { m[k.toLowerCase()] = (m[k.toLowerCase()] || 0) + o[k]; }); });
    return m;
  }
  function addDays(d, n) { var x = new Date(d + 'T00:00:00Z'); x.setUTCDate(x.getUTCDate() + n); return x.toISOString().slice(0, 10); }
  function localToday() { return new Date().toLocaleDateString('en-CA'); }
  /* rows for each date in [from, to]; returns { date: [row] } where row = {item, beg, auto, man, used, end, begSet, endSet} */
  function range(from, to) {
    var out = {}, run = {}, today = localToday(), its = items();
    for (var d = from; d <= to; d = addDays(d, 1)) {
      var au = autoUsed(d), rows = [];
      its.forEach(function (it) {
        var r = rec(d, it.id), man = 0; if (r) r.man.forEach(function (m) { man += m.n; });
        var a = au[String(it.name).toLowerCase()] || 0, used = a + man;
        var beg = r && r.beg != null ? r.beg : (run[it.id] != null ? run[it.id] : null);
        if (beg == null && d === today && it.qty != null) beg = it.qty + used;
        var end = r && r.end != null ? r.end : (beg == null ? null : beg - used);
        run[it.id] = end;
        rows.push({ item: it, beg: beg, auto: a, man: man, used: used, end: end, begSet: !!(r && r.beg != null), endSet: !!(r && r.end != null) });
      });
      out[d] = rows;
    }
    return out;
  }
  function addUsed(date, id, n) {
    var r = rec(date, id, true); r.man.push({ n: n, t: Date.now() });
    if (date === localToday()) { var it = items().filter(function (i) { return i.id === id; })[0]; if (it && it.qty != null) { it.qty = Math.max(0, it.qty - n); it.updated = D.todayPH(); D.saveInventory(); } }
    return save();
  }
  function setOverride(date, id, which, val) { var r = rec(date, id, true); if (val === '' || val == null) delete r[which]; else r[which] = Number(val); return save(); }

  /* ---------- minimal .xlsx writer (stored zip, no compression) ---------- */
  var T = (function () { var t = [], c, n, k; for (n = 0; n < 256; n++) { c = n; for (k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
  function crc(b) { var c = 0xFFFFFFFF; for (var i = 0; i < b.length; i++) c = T[(c ^ b[i]) & 255] ^ (c >>> 8); return (c ^ 0xFFFFFFFF) >>> 0; }
  function u8(s) { return new TextEncoder().encode(s); }
  function zip(files) {
    var parts = [], cen = [], off = 0;
    function w16(a, v) { a.push(v & 255, (v >> 8) & 255); } function w32(a, v) { w16(a, v & 0xFFFF); w16(a, (v >>> 16) & 0xFFFF); }
    files.forEach(function (f) {
      var nm = u8(f.name), data = u8(f.data), c = crc(data), h = [];
      w32(h, 0x04034b50); w16(h, 20); w16(h, 0x0800); w16(h, 0); w16(h, 0); w16(h, 0x21); w32(h, c); w32(h, data.length); w32(h, data.length); w16(h, nm.length); w16(h, 0);
      parts.push(new Uint8Array(h), nm, data);
      var e = []; w32(e, 0x02014b50); w16(e, 20); w16(e, 20); w16(e, 0x0800); w16(e, 0); w16(e, 0); w16(e, 0x21); w32(e, c); w32(e, data.length); w32(e, data.length); w16(e, nm.length); w16(e, 0); w16(e, 0); w16(e, 0); w16(e, 0); w32(e, 0); w32(e, off);
      cen.push(new Uint8Array(e), nm); off += h.length + nm.length + data.length;
    });
    var csz = 0; cen.forEach(function (p) { csz += p.length; });
    var end = []; w32(end, 0x06054b50); w16(end, 0); w16(end, 0); w16(end, files.length); w16(end, files.length); w32(end, csz); w32(end, off); w16(end, 0);
    return new Blob(parts.concat(cen, [new Uint8Array(end)]), { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  }
  function xe(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function col(i) { return String.fromCharCode(65 + i); }
  /* sheet = { name, widths:[..], rows:[ [ {v, s} | v ... ] ] }, styles: 1 bold, 2 bold+grey fill, 3 title */
  function sheetXml(sh) {
    var x = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><sheetViews><sheetView workbookViewId="0"><pane ySplit="3" topLeftCell="A4" state="frozen"/></sheetView></sheetViews><cols>';
    sh.widths.forEach(function (w, i) { x += '<col min="' + (i + 1) + '" max="' + (i + 1) + '" width="' + w + '" customWidth="1"/>'; });
    x += '</cols><sheetData>';
    sh.rows.forEach(function (r, ri) {
      x += '<row r="' + (ri + 1) + '">';
      r.forEach(function (c, ci) {
        if (c == null) return; if (typeof c !== 'object') c = { v: c };
        if (c.v === '' || c.v == null) { if (c.s) x += '<c r="' + col(ci) + (ri + 1) + '" s="' + c.s + '"/>'; return; }
        var s = c.s ? ' s="' + c.s + '"' : '', ref = col(ci) + (ri + 1);
        x += typeof c.v === 'number' ? '<c r="' + ref + '"' + s + '><v>' + c.v + '</v></c>' : '<c r="' + ref + '"' + s + ' t="inlineStr"><is><t>' + xe(c.v) + '</t></is></c>';
      });
      x += '</row>';
    });
    return x + '</sheetData></worksheet>';
  }
  function xlsx(sheets) {
    var f = [], ct = '<?xml version="1.0" encoding="UTF-8"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>';
    var wb = '<?xml version="1.0" encoding="UTF-8"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets>', rel = '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">';
    sheets.forEach(function (sh, i) {
      var n = i + 1;
      ct += '<Override PartName="/xl/worksheets/sheet' + n + '.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>';
      wb += '<sheet name="' + xe(sh.name) + '" sheetId="' + n + '" r:id="rId' + n + '"/>';
      rel += '<Relationship Id="rId' + n + '" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet' + n + '.xml"/>';
      f.push({ name: 'xl/worksheets/sheet' + n + '.xml', data: sheetXml(sh) });
    });
    rel += '<Relationship Id="rIdS" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>';
    f.unshift({ name: '[Content_Types].xml', data: ct + '</Types>' },
      { name: '_rels/.rels', data: '<?xml version="1.0" encoding="UTF-8"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>' },
      { name: 'xl/workbook.xml', data: wb + '</sheets></workbook>' }, { name: 'xl/_rels/workbook.xml.rels', data: rel },
      { name: 'xl/styles.xml', data: '<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><fonts count="3"><font><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="11"/><name val="Calibri"/></font><font><b/><sz val="14"/><name val="Calibri"/></font></fonts><fills count="3"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill><fill><patternFill patternType="solid"><fgColor rgb="FFDCE8EE"/></patternFill></fill></fills><borders count="1"><border/></borders><cellStyleXfs count="1"><xf/></cellStyleXfs><cellXfs count="4"><xf/><xf fontId="1" applyFont="1"/><xf fontId="1" fillId="2" applyFont="1" applyFill="1"/><xf fontId="2" applyFont="1"/></cellXfs></styleSheet>' });
    return zip(f);
  }
  function sheetFor(name, title, dayRows, cols) {
    var rows = [[{ v: title, s: 3 }], [], [{ v: 'Item', s: 2 }, { v: 'Beg', s: 2 }, { v: 'Used', s: 2 }, { v: 'End', s: 2 }, { v: 'Units', s: 2 }]], last = null;
    dayRows.forEach(function (r) {
      var g = r.item.group || 'Other';
      if (g !== last) { rows.push([{ v: g, s: 1 }]); last = g; }
      rows.push([r.item.name, r.beg == null ? '' : r.beg, r.used, r.end == null ? '' : r.end, r.item.unit || '']);
    });
    return { name: name, widths: [34, 10, 10, 10, 12], rows: rows };
  }
  function exportXlsx(from, to, day) {
    var rg = range(from, to), dates = Object.keys(rg).sort(), first = rg[dates[0]], lastR = rg[dates[dates.length - 1]];
    var month = first.map(function (r, i) {
      var used = 0, beg = null; dates.forEach(function (d) { used += rg[d][i].used; if (beg == null) beg = rg[d][i].beg; });
      return { item: r.item, beg: beg, used: used, end: lastR[i].end };
    });
    var dr = rg[day] || range(day, day)[day];
    var blob = xlsx([sheetFor('Month', 'Inventory ' + from + ' to ' + to, month), sheetFor(day, 'Inventory ' + day, dr)]);
    var a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'inventory-' + from.slice(0, 7) + '.xlsx';
    document.body.appendChild(a); a.click(); setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  window.MBInvLog = { range: range, addUsed: addUsed, setOverride: setOverride, exportXlsx: exportXlsx, localToday: localToday, addDays: addDays };
})();
