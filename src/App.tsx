import { useState } from 'react';
import Dropzone from './components/Dropzone';
import { Button } from './components/ui/button';

import { magnacareToQnMap } from './lib/magnacareToQnMap';
import { qnxtToMap } from './lib/qnxtToMap';
import { compareFeeSchedules } from './lib/compareFeeSchedules';
import { inputMapToCsv } from './lib/qnxtFormatToCsv';
import { createBlobUrl } from './lib/createBlobUrl';
import { getCounts } from './lib/getCounts';
import CountsTable from './components/CountsTable';

function App() {
  const [srcPath, setSrcPath] = useState('');
  const [qnxtPath, setQnxtPath] = useState('');
  const [srcData, setSrcData] = useState('');
  const [qnxtData, setQnxtData] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [counts, setCounts] = useState({
    add: 0,
    update: 0,
    terminate: 0,
    pass: 0,
  });

  async function dropEventHandler(event: React.DragEvent) {
    event.preventDefault();
    event.stopPropagation();

    const element = event.target as HTMLDivElement;
    const data = event.dataTransfer;
    const id = element.id;
    const file = data.files[0];

    const csv = await file.text();

    switch (id) {
      case 'srcFile':
        setSrcPath(file.name);
        setSrcData(csv);
        break;
      case 'qnxtFile':
        setQnxtPath(file.name);
        setQnxtData(csv);
        break;
    }
  }

  function handleCompareClick() {
    const src = magnacareToQnMap(srcData);
    const qnxt = qnxtToMap(qnxtData);
    const result = compareFeeSchedules(src, qnxt);
    const resultCounts = getCounts(result);
    const csv = inputMapToCsv(result);
    const url = createBlobUrl(csv);
    setDownloadUrl(url);

    setCounts({
      add: resultCounts.added,
      update: resultCounts.updated,
      terminate: resultCounts.terminated,
      pass: resultCounts.passed,
    });
  }

  return (
    <main className="flex flex-col justify-center items-center">
      <Dropzone
        id="srcFile"
        title="Source File"
        description="Drop the source file below"
        path={srcPath}
        dropHandler={dropEventHandler}
      />
      <Dropzone
        id="qnxtFile"
        title="QNXT File"
        description="Drop the QNXT file below"
        path={qnxtPath}
        dropHandler={dropEventHandler}
      />
      {srcPath && qnxtPath && (
        <Button variant="outline" onClick={handleCompareClick}>
          Compare Fee Schedules
        </Button>
      )}
      {downloadUrl && (
        <Button variant="outline">
          <a href={downloadUrl}>Download Output</a>
        </Button>
      )}
      {downloadUrl && (
        <CountsTable
          rows={Object.entries(counts).map(([k, v]) => ({
            label: k,
            value: String(v),
          }))}
        />
      )}
    </main>
  );
}

export default App;
