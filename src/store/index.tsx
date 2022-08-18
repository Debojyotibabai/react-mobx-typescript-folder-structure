import { useLocalObservable } from 'mobx-react';
import { makeAutoObservable, observable } from 'mobx';
import { createContext, useContext } from 'react';
import { fetchPostRequest } from '../libs/network';
import { AsyncTrunk, ignore } from 'mobx-sync';

class RootStore {
  // @observable
  // authStore: AuthStore;
  // @observable
  // @ignore
  // deviceStore: DeviceStore;
  // @observable
  // machineStore: MachineStore;
  // constructor() {
  //   this.authStore = new AuthStore(this);
  //   this.deviceStore = new DeviceStore(this);
  //   this.machineStore = new MachineStore(this);
  // }
}

// class AuthStore {
//   @ignore
//   rootStore: RootStore;
//   isLoggedIn: boolean = false;
//   token: string = '';
//   data: { name: string; email: string } = { name: '', email: '' };

//   constructor(rootStore: RootStore) {
//     this.rootStore = rootStore;
//     makeAutoObservable(this);
//   }

//   login = async ({ email, password }: { email: string; password: string }) => {
//     try {
//       const payload = new FormData();
//       payload.append('username', email);
//       payload.append('password', password);
//       const response = await fetchPostRequest(endpoints.auth.signin, payload);
//       if (response.status < 400) {
//         this.isLoggedIn = true;
//         this.token = response.data.data.token;
//         this.data = { name: response.data.data.name, email: response.data.data.company_name };
//         localStorage.setItem('authToken', response.data.data.token);
//       }
//     } catch (err: any) {
//       console.log(err);
//       showToastMessage(err?.data?.message || 'Something went wrong', 'error');
//     }
//   };

//   logout = () => {
//     this.isLoggedIn = false;
//     this.token = '';
//     this.data = { name: '', email: '' };
//     localStorage.clear();
//   };
// }

// class MachineStore {
//   @ignore
//   rootStore: RootStore;
//   data: any = { name: '' };

//   constructor(rootStore: RootStore) {
//     this.rootStore = rootStore;
//     makeAutoObservable(this);
//   }

//   update = () => {
//     this.data.name = 'hello world';
//   };
// }

// class DeviceStore {
//   @ignore
//   rootStore: RootStore;

//   constructor(rootStore: RootStore) {
//     this.rootStore = rootStore;
//     makeAutoObservable(this);
//   }
// }

export const rootStore = new RootStore();

export const trunk = new AsyncTrunk(rootStore, { storage: window.localStorage });

const StoreContext = createContext(rootStore);

export const StoreProvider = ({ children }: { children: JSX.Element }) => {
  const store = useLocalObservable(() => rootStore);

  return <StoreContext.Provider value={{ ...store }}>{children}</StoreContext.Provider>;
};

export const useStore = () => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider.');
  }
  return store;
};
