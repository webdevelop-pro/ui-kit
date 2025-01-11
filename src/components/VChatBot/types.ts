export interface User {
  id: string;
  name: string;
  avatar?: boolean;
}

export interface IChatButton {
  type?: string;
  size?: string;
  text: string;
  block?: boolean;
}


export interface IMessage {
  type: string;
  value: string;
  answear?: IMessage[];
  event?: string;
  choices?: string[];
  code?: string;
  disableLinkReplace?: boolean;
  button?: IChatButton;
  prefill?: {
    message?: string;
  };
}

export interface IChatAttributes {
  step: string;
  topic?: string;
}

export interface IMessageArrayItem {
  id: string;
  user: User;
  attributes: IChatAttributes;
  message: IMessage;
  choices?: string[];
  finished?: boolean;
}
export type AsyncState = null | 'loading' | 'error' | 'complete';


export enum MessageType {
  text = 'text',
  choice = 'choice',
  embedCode = 'embedCode',
  hsForm = 'hsForm',
}

export interface IChatBody {
  attributes: IChatAttributes;
  message: IMessage;
}

export interface IError {
  $message: string;
}

export interface IStreamDelta {
  content: string;
  role: string;
}

export interface IAiResponse {
  delta: IStreamDelta;
  finish_reason: string;
  index: number;
}

export interface IStreamItem {
  id: string;
  created: number;
  choices: string[];
  ai_response: IAiResponse[];
}
