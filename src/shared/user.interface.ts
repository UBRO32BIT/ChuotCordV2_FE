export interface User {
  _id: string,
  username: string;
  email: string;
  phoneNumber: string;
  profilePicture: string;
  isEmailVerified: boolean;
  // Add other user properties as needed
}

export interface UserPartial {
  _id: string,
  username: string,
  profilePicture: string,
}