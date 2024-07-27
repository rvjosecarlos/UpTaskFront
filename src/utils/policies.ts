import { Project, UserDataSesion } from "../types";

export const isManager = ( userId: UserDataSesion['_id'], managerId: Project['manager'] ) => userId.toString() === managerId.toString()