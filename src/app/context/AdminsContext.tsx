
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { Admin } from '@/interfaces/Admins'

axios.defaults.baseURL = 'http://localhost:3000'; // Configura la URL base adecuada

export const AdminsContext = createContext<{
    admins: Admin[];
    admin: Admin | null;
    adminProfile: Admin | null;
    getAdmins: () => Promise<void>;
    createAdmin: (formData: FormData) => Promise<any>;
    getAdmin: (id: string) => Promise<any>;
    getAdminProfile: (email: string) => Promise<any>;
    deleteAdmin: (email: string) => Promise<any>;
}>({
    admins: [],
    admin: null,
    adminProfile: null,
    getAdmins: async () => { },
    createAdmin: async (formData: FormData) => null,
    getAdmin: async (id: string) => null,
    getAdminProfile: async (id: string) => null,
    deleteAdmin: async (email: string) => null,
});

export const AdminsProvider = ({ children }: { children: React.ReactNode }) => {

    const [admins, setAdmins] = useState<any>([]);
    const [admin, setAdmin] = useState<Admin | null>(null);
    const [adminProfile, setAdminProfile] = useState<Admin | null>(null); // Inicializar como null] // Inicializar como null

    async function getAdmins() {
        try {
            const response = await axios.get("api/admins");
            setAdmins(response.data);
        }
        catch (error) {
            console.error("Error al cargar administradores:", error);
        }
    }

    async function getAdmin(adminId: string) {
        try {
            const response = await axios.get(`api/admins/${adminId}`);
            setAdmin(response.data)
        }
        catch (error) {
            console.error("Error al cargar usuario:", error);
        }
    }

    async function createAdmin(formData: FormData): Promise<any> {
        try {
            const response = await axios.post("api/admins", formData);
            const newAdmin = response.data;
            console.log(response.data)
            setAdmins([newAdmin, ...admins]);
            console.log(admins)
            getAdmins()
            // console.log(users)
            return response; // Devuelve la respuesta completa
        } catch (error) {
            console.error("Error al crear usuario:", error);
            throw error;
        }
    }

    async function deleteAdmin(adminId: string) {
        try {
            const response = await axios.delete(`api/admins/${adminId}`);
            const newAdmins = admins.filter((admin: any) => admin.adminId !== adminId);
            setAdmins(newAdmins);
            getAdmins()
            return response;
        }
        catch (error) {
            console.error("Error al eliminar usuario:", error);
        }
    }

    async function getAdminProfile(email: string) {
        try {
            const response = await axios.get(`api/adminProfile/${email}`);
            setAdminProfile(response.data)
        }
        catch (error) {
            console.error("Error al cargar usuario:", error);
        }
    }

    useEffect(() => {
        getAdmins()
    }, [])



    return (
        <AdminsContext.Provider value={{ admins, getAdmins, createAdmin, getAdmin, admin, deleteAdmin, adminProfile, getAdminProfile }}>
            {children}
        </AdminsContext.Provider>

    );
};
