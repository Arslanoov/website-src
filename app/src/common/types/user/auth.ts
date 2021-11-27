export type SessionUserInterface = {
  id: string,
  username: string,
  role: string
};

export enum AuthStatus {
  logged = 'authenticated',
  guest = 'unauthenticated',
  loading = 'loading'
}