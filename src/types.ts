export interface UserType {
  [x: string]: any;
  _id?: string;
  address?: string;
  city?: string;
  country?: string;
  createdAt?: string;
  current_practise_address?: [string];
  dob: string;
  email: string;
  fax: number;
  firstname: string;
  gender: string;
  height: string;
  id: string;
  isApproved?: boolean;
  lastname: string;
  location?: string;
  medicalCondition: string;
  name: string;
  password: string;
  phone: number;
  postcode?: string;
  profile_photo: any;
  relation: string;
  role_id: string;
  state?: string;
  token: string;
  weight?: string;
}

export interface AppointmentType {
  map(arg0: (data: any, i: any) => JSX.Element): import("react").ReactNode;
  _id: string;
  patient_details?: UserType;
  doctor_details?: UserType;
  user_details?: UserType;
  patientId: string;
  appointmentType: string;
  status: string;
  dateOfAppointment: string;
  name: string;
  isEmergency: boolean;
  createdAt: string;
  role_id: string;
  callingLing?: any;
  description?: string;
  handleVideoCall?: any;
  handleApprove?: any;
  handleAppointmentCancel?: any;
  handleAppointmentReject?: any;
  Meta?: any;
}
export interface MessageType {
  _id: string;
  userId?: UserType;
  appointmentId?: AppointmentType;
  message: string;
  received: boolean;
  seen: boolean;
  createdAt: string;
}

export interface HealthProfileType {
  _id: string;
  name?: string;
  self?: string;
  relation?: string;
  userId?: string;
  createdAt?: string;
}

export interface VideoChatType {
  _id: string;
  room: string;
  identity: string;
  token: string;
}

export interface Note {
  _id: string;
  title: string;
  url: string;
}

export interface Video {
  _id: string;
  title: string;
  url: string;
}

export interface Goal {
  _id: string;
  title: string;
  goals: any;
  patientId: any;
}

export interface AvailabilityType {
  _id: string;
  start: string;
  end: string;
  break_start: string;
  break_end: string;
}
