/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = generateReport(data);
  postMessage(response);
});

function generateReport(data: any): any {
  console.log('web-worker: ' + data)
  // DO A LOT OF HEAVY STUFF HERE
  const reportData = (data: any) => 'reportStuff' + data

  return reportData;




}
