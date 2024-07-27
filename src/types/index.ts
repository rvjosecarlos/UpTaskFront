import { z } from "zod";

// Types Autenticacion
const authSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    current_password: z.string(),
    password: z.string(),
    password_confirmation: z.string(),
    token: z.string()
});

export type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, 'email' | 'password'>;
export type UserRegistrationForm = Pick<Auth, 'name' | 'email' | 'password' | 'password_confirmation'>;
export type ConfirmToken = Pick<Auth, 'token'>;
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>;
export type ForgotPasswordForm = RequestConfirmationCodeForm;
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>;
export type ChangePasswordForm = Pick<Auth, 'password' | 'password_confirmation' | 'current_password'>;
export type CheckPasswordForm = Pick<Auth, 'password'>;

// Datos de sesión del usuario
export const userDataSesion = authSchema.pick({
    name: true,
    email: true
}).extend({
    _id: z.string()
})
export type UserDataSesion = z.infer<typeof userDataSesion>;
export type UserDataProfile = Pick<UserDataSesion, 'name' | 'email'>

// Types Notas
export const notesSchema = z.object({
    _id: z.string(),
    content: z.string(),
    createdBy: userDataSesion,
    task: z.string(),
    createdAt: z.string()
});
export type Note = z.infer<typeof notesSchema>;
export type NoteDataForm = Pick<Note, 'content'>;

// Types Tareas
export const taskStatusSchema = z.enum(["pending", "onHold", "inProgress", "underReview", "completed"]) 

export const taskSchema = z.object({
    _id: z.string(),
    name: z.string(),
    description: z.string(),
    taskStatus: taskStatusSchema,
    updateStatusHistorial: z.array(z.object({
        _id: z.string(),
        user: userDataSesion,
        taskStatus: z.string()
    })),
    notes: z.array(notesSchema),
    createdAt: z.string(),
    updatedAt: z.string()
});

export const TaskFormDataSchema = taskSchema.pick({
    name: true,
    description: true
});

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = z.infer<typeof TaskFormDataSchema>

// Types Colaboradores

export const teamUserSchema = userDataSesion.pick({
    name: true,
    email: true,
}).extend({
    _id: z.string()
});
export const teamUsersSchema = z.array(teamUserSchema);
export type TeamMember = z.infer<typeof teamUserSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>;

// Types Proyectos

export const ProjectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema.pick({
        _id: true,
        name: true,
        description: true,
        taskStatus: true
    })),
    manager: z.string(userDataSesion.pick({ _id: true })),
    team: z.array(z.string(teamUserSchema.pick({ _id: true })))
    // Tareas, fecha creacion, fecha actualizacion
});

export const ProjectFormDataSchema = ProjectSchema.pick({
    _id: true,
    projectName: true,
    clientName: true,
    description: true,
    manager: true
});

export const DashboardProjectSchema = z.array( ProjectFormDataSchema );

export type Project = z.infer<typeof ProjectSchema>;
export type ProjectFormData = Pick<Project, 'projectName' | 'clientName' | 'description'>;
export type ProjectFormEdit = Pick<Project, 'projectName' | 'clientName' | 'description'>;

