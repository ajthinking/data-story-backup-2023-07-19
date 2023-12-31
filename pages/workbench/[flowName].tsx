import { DataStoryApp } from '../../components/DataStoryApp';
import fs from 'fs';
import { StoreSchema, useStore } from '../../components/DataStory/store';
import { shallow } from 'zustand/shallow';

export default function Workbench({
  flowName,
  flow,
}: any) {
  const flowData = JSON.parse(flow)

  return (
    <DataStoryApp defaultFlowName={flowName} flow={flowData} />
  )
}

// This function gets called at build time
export async function getStaticProps({ params }: any) {
  const flow = params.flowName === 'untitled'
    ? '{"nodes": [], "edges": []}'
    : fs.readFileSync(__dirname + '/../../../../.datastory/flows/' + params.flowName, 'utf8')

  const flowName = params.flowName === 'untitled'
    ? ''
    : params.flowName.replace('.json', '')

  return {
    props: {
      flowName,
      flow,
    },
  }
}

export async function getStaticPaths() {
  // This is temporary - a datastory server should return the available flows
  // might be via socket or other protocoll. For demo purposes it is now here
  const flowNames = fs.readdirSync(__dirname + '/../../../../.datastory/flows')
    .filter(fn => fn.endsWith('.json'));


  return {
    paths: [...flowNames, 'untitled'].map((flowName) => ({
      params: {
        flowName
      },
    })),
    fallback: false, // can also be true or 'blocking'
  }
}