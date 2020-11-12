import { Dispatch } from 'react';
import { IGetState } from '../Reducers/Reducers';
import { CreateChatThunk } from './chats.action';

export const SendMessageThunk = (
  members: string[],
  from: string,
  body: string
) => async (dispatch: Dispatch<any>, getState: IGetState) => {
  try {
    const companion_id = members.find((member) => member !== from);
    if (!getState().chats.find((chat) => chat.companion_id === companion_id)) {
      dispatch(CreateChatThunk(members));
    }
    const message = { members, from, body };
    const res = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const SendReplyThunk = (
  members: string[],
  from: string,
  body: string,
  reply: {
    from: string;
    body: string;
    created_at: number;
  }
) => async () => {
  try {
    const message = { members, from, body, reply };
    const res = await fetch('/api/message/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const UpdateMesssageThunk = (
  user_id: string,
  created_at: number,
  body: string
) => async () => {
  try {
    const message = { user_id, created_at, body };
    const res = await fetch('/api/message/update', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const DeleteMessageThunk = (
  user_id: string,
  created_at: number
) => async () => {
  try {
    const message = { user_id, created_at };
    const res = await fetch('/api/message/create', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message);
    }
  } catch (error) {
    console.log(error.message);
  }
};
