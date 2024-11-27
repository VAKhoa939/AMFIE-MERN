export interface Message {
  content: string;
  className: string;
  type: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isMessage(obj: any): obj is Message {
  return 'content' in obj 
  && 'className' in obj 
  && 'type' in obj
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isMessageList(obj: any): obj is Message[] {
  return Array.isArray(obj) && obj.every(isMessage)
}

export default Message