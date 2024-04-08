type User = {
  id: string;
  name: string;
  email: string;
  profileViewCount: number;
  imagePath: string;
  school: School;
};

type UserToSignUp = {
  name: string;
  schoolId: string | null;
  email: string;
  password: string;
};

type UserToSignIn = Pick<UserToSignUp, "email" | "password">;
