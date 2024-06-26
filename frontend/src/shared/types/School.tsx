type School = {
  id: string
  fullAddress: string
  name: string
  imagePath: string
  nameWithAddress: string
  admins: Omit<User, "school">[]
}