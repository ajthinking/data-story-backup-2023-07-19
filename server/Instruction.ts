/**
 * An instruction could be a way for the server to ask the client to do something
 */
export type Instruction = {
  type: string
  source: string
}

export type ConsoleLog = Instruction & {
  type: "console.log",
  source: "oin48la03sgö3s03sg30sln3gns03nlsg"
}

export type Download = Instruction & {
  type: "download",
  source: "oin48la03sgö3s03sg30sln3gns03nlsg"
}

export type Alert = Instruction & {
  type: "alert",
  source: "oin48la03sgö3s03sg30sln3gns03nlsg"
}