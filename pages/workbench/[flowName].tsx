import { DataStory } from '../../components/DataStory';
import fs from "fs";
import { StoreSchema, useStore } from '../../components/Workbench/store';
import { shallow } from 'zustand/shallow';

export default function Workbench({
  flowName,
  flow,
}: any) {
  const flowData = JSON.parse(flow)

  return (
    <DataStory defaultFlowName={flowName} flow={flowData} />
  )
}

// This function gets called at build time
export async function getStaticProps({ params }: any) {
  const flow = params.flowName === 'untitled.json'
    ? '{"nodes": [], "edges": []}'
    : fs.readFileSync(__dirname + '/../../../../.datastory/' + params.flowName, 'utf8')

  return {
    props: {
      flowName: params.flowName,
      flow,
    },
  }
}

export async function getStaticPaths() {
  // This is temporary - a datastory server should return the available flows
  // might be via socket or other protocoll. For demo purposes it is now here
  const flowNames = fs.readdirSync(__dirname + '/../../../../.datastory')
    .filter(fn => fn.endsWith('.json'));


  return {
    paths: [...flowNames, 'untitled.json'].map((flowName) => ({
      params: {
        flowName
      },
    })),
    fallback: false, // can also be true or 'blocking'
  }
}