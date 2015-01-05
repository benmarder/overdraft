from pyquery import PyQuery as pq
import re
import pprint
import json

SLUG_RE = re.compile('[a-z]+')

if __name__=="__main__":
    html = file('2003.html').read()
    html = pq(html)
    rows = html('tr')
    breadcrumbs = []
    level = -1
    started = False
    for row in rows:
        tds = pq(row)('td')
        if len(tds) != 8: continue
        cells = [ pq(x).text() for x in tds ]
        if '' in [x.strip() for x in cells]: continue

        slug = '_'.join( SLUG_RE.findall(cells[0].lower()) )

        rec = {
            'fifths': [ float(x.replace(',','')) for x in cells[1:7] ],
            'name_en': cells[0],
            'name_he': cells[7]
        }

        level = 3-sum([ len(pq(tds[0])(x)) for x in ['b','u','i'] ])
        if level == 0:
            started = True
        if not started: continue

        if level < 3:
            if len(breadcrumbs) < level+1:
                breadcrumbs.append(rec)
            else:
                breadcrumbs[level] = rec
                breadcrumbs = breadcrumbs[:level+1]
            if len(breadcrumbs)>1:
                breadcrumbs[-2].setdefault('categories',{})[slug] = rec
        else:
            breadcrumbs[-1].setdefault('categories',{})[slug] = rec

    print json.dumps(breadcrumbs[0], indent=2)
