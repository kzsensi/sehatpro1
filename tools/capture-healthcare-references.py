"""Save bounded, publicly delivered HTML/CSS/JS for design inspection only."""
import json,re,urllib.request,urllib.parse
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]/'reference/sites'
for name,base in [('cleveland','https://my.clevelandclinic.org/'),('adventhealth','https://www.adventhealth.com/'),('atlantic-health','https://www.atlantichealth.org/home')]:
    dest=ROOT/name;dest.mkdir(parents=True,exist_ok=True);entries=[];used=0
    def get(url):
        req=urllib.request.Request(url,headers={'User-Agent':'Mozilla/5.0'})
        with urllib.request.urlopen(req,timeout=20) as r:return r.read(3*1024*1024)
    try:
        raw=get(base);(dest/'index.html').write_bytes(raw);used+=len(raw)
        entries.append({'url':base,'file':'index.html','bytes':len(raw)})
        html=raw.decode('utf8',errors='replace')
        candidates=list(dict.fromkeys(re.findall(r'(?:src|href)=["\']([^"\']+\.(?:css|js)(?:\?[^"\']*)?)["\']',html)))
        for i,asset in enumerate(candidates[:10]):
            url=urllib.parse.urljoin(base,asset)
            if any(t in url.lower() for t in ['analytics','tagmanager','facebook','onetrust']):continue
            try:
                data=get(url)
                if used+len(data)>8*1024*1024:break
                suffix='.css' if '.css' in urllib.parse.urlsplit(url).path else '.js'
                file=f'asset-{i}{suffix}';(dest/file).write_bytes(data);used+=len(data)
                entries.append({'url':url,'file':file,'bytes':len(data)})
            except Exception as e:entries.append({'url':url,'error':str(e)})
    except Exception as e:entries.append({'url':base,'error':str(e)})
    (dest/'manifest.json').write_text(json.dumps(entries,indent=2))
    print(name,used,'bytes',len(entries),'records')
