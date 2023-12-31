import Link from 'next/link';
import { DataStoryApp } from '../components/DataStoryApp';
import { Header } from '../components/Header';
import Head from 'next/head';
import { useRouter } from 'next/router';
import fs from 'fs';
import { signalsFlow } from '../core/flows/signalsFlow';
import { useEffect, useState } from 'react';
import { SerializedReactFlow } from '../core/types/SerializedReactFlow';

export default function Workbench() {
  const [flows, setFlows] = useState<{
    name: string;
    flow: SerializedReactFlow
  }[]>([])
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/flows');
        if (!response.ok) {
          throw new Error("Error fetching flows");
        }
        const data = await response.json();
        setFlows(data);
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };
    fetchData();
  }, []);

  const goToNewUntitled = () => {
    router.push('/workbench/untitled')
  }

  return (
    <>
      <Head>
        <title>DataStory</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen bg-gray-700">
        <Header />
        <div className="w-full h-5/6 bg-gray-700 h-screen">
          <div className="flex flex-col mx-auto items-center w-full h-screen">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Flows
                  </th>
                </tr>
              </thead>
              <tbody className="font-mono">
                {flows.map((flow) => (<tr
                  key={flow.name}
                  onClick={() => router.push(`/DataStory/${flow.name}`)}
                  className="cursor-pointer dark:bg-gray-800 hover:bg-blue-800 bg-white border-b  dark:border-gray-700"
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {flow.name.replace('.json', '')}
                  </th>
                </tr>))}
                <tr
                  className="cursor-pointer dark:bg-gray-800 hover:bg-blue-800 bg-white border-b  dark:border-gray-700"
                  onClick={goToNewUntitled}
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <span className="text-yellow-400">+</span> Create Flow
                  </th>
                </tr>                
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
