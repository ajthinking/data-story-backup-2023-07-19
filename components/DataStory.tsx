import Head from "next/head";
import React, { useEffect, useState } from "react";
import { Editor } from "./Editor";
import { Header } from "./Header";
import Workbench from "./Workbench";
import { StoreSchema, useStore } from "./Workbench/store";
import { shallow } from "zustand/shallow";
export function DataStory({
  defaultFlowName,
  flow,
}: {
  defaultFlowName?: string;
  flow?: any;
}) {
  const selector = (state: StoreSchema) => ({
    flowName: state.flowName,
    setFlowName: state.setFlowName,
    open: state.open,
  });

  const { flowName, setFlowName, open } = useStore(selector, shallow);

  useEffect(() => {
    if(flow) open(flow.nodes, flow.edges);
    if(defaultFlowName) setFlowName(defaultFlowName);
  }, [flow, defaultFlowName, open, setFlowName])

  return <>
      <Head>
        <title>DataStory</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen bg-vsCodeWarmGray-900">
        <Header flowName={flowName} />
        <div className="w-full h-5/6">
          {<Workbench />}
        </div>
      </div>
    </>;
}
  