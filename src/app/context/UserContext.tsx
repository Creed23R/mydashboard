'use client'

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { User, Params, UpdateUser } from '@/interfaces/User'

axios.defaults.baseURL = 'http://localhost:3000'; // Configura la URL base adecuada

export const UserContext = createContext<{
    users: User[];
    loadUsers: () => Promise<void>;

    user: User | null;
    getUser: (id: string) => Promise<any>;

    createUser: (formData: FormData) => Promise<any>;
    deleteUser: (email: string) => Promise<any>;
    updateUser: (id: number, formData: FormData) => Promise<any>;

}>({
    users: [],
    loadUsers: async () => { },

    user: null,
    getUser: async (id: string) => null,

    createUser: async (formData: FormData) => null,
    deleteUser: async (email: string) => null,
    updateUser: async (id: number, formData: FormData) => null,
});

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {

    const [users, setUsers] = useState<any>([]);
    const [user, setUser] = useState<User | null>(null); // Inicializar como null

    async function loadUsers() {
        try {
            const response = await axios.get("api/users");
            setUsers(response.data);
        }
        catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    }
    // async function getUser(id: string) {
    //     try {
    //         const response = await axios.get(`api/users/${id}`);
    //         setUser(response.data)
    //     }
    //     catch (error) {
    //         console.error("Error al cargar usuarios:", error);
    //     }
    // }

    async function getUser(id: string) {
        try {
            const response = await axios.get(`api/users?email=${id}`);
            setUser(response.data);
        } catch (error) {
            console.error("Error al cargar usuarios:", error);
        }
    }


    async function createUser(formData: FormData): Promise<any> {
        try {
            const response = await axios.post("api/admins", formData);
            const newUser = response.data;
            console.log(response.data)
            setUsers([newUser, ...users]);
            console.log(users)
            loadUsers()
            // console.log(users)
            return response; // Devuelve la respuesta completa
        } catch (error) {
            console.error("Error al crear usuario:", error);
            throw error;
        }
    }

    async function deleteUser(id: string): Promise<any> {
        try {
            const response = await axios.delete(`api/users/${id}`);
            const newUsers = users.filter((user: any) => user.id !== id);
            setUsers(newUsers);
            loadUsers()
            return response;
        }
        catch (error) {
            console.error("Error al eliminar usuario:", error);
            throw error;
        }
    }

    async function updateUser(id: number, formData: FormData) {
        // console.log(formData.get('name'))
        // console.log(formData.get('lastname'))
        // console.log(formData.get('email'))
        // console.log(formData.get('role'))
        // console.log(formData.get('image'))
        try {
            const response = await axios.put(`api/users/${id}`, formData);
            console.log(response)
            const updatedUser = response.data;
            setUsers(users.map((user: User) => user.id === id ? updatedUser : user));
            return response;
        }
        catch (error) {
            console.error("Error al actualizar usuario:", error);
            throw error;
        }
    }

    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <UserContext.Provider value={{ users, loadUsers, createUser, deleteUser, user, getUser, updateUser }}>
            {children}
        </UserContext.Provider>

    );
};
