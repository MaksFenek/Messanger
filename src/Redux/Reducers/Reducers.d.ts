// Root Reducer
export interface RootReducerInterface {
  readonly user: IUserReducerState;
  readonly chats: IChats[];
}

export type IGetState = () => Readonly<RootReducerInterface>;

// User Eeducer
export interface IUserReducerState {
  readonly user_id: string;
  readonly name: string;
  readonly theme: boolean;
  readonly status: string;
  socket: any;
}

// Chats Reducer
export type IMessage = {
  readonly from: string;
  readonly body: string;
  readonly created_at: string | number;
  readonly received: boolean;
};

export interface IChats {
  readonly chat_id: string;
  readonly companion_id: string;
  readonly companion_name: string;
  readonly last_message: string;
  readonly created_at: string | number;
  readonly messages: IMessage[];
}
