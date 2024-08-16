"use client"

import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTodos, fetchTodos } from "@/store/todosSlice";

export default function TodoForm() {
    const [formData, setFormData] = useState({
        title: '', 
        completed: false
    });

    const dispatch = useDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data before submission:', formData);
        try {
            const res = await dispatch(createTodos(formData));
            console.log('Response from createTodos:', res);
    
            if (res.payload) {
                alert('Todo Created Successfully');
                setFormData({ title: '', completed: false });
                dispatch(fetchTodos());
            } else {
                alert('Failed to create new todo.');
            }
        } catch (error) {
            console.error('Error creating todo:', error);
            alert('Failed to create new todo.');
        }
        // You might want to check the formData state after it's been reset
        console.log('Form Data after reset:', formData);
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <input 
                type="text" 
                name="title"  // Corrected name attribute
                placeholder="Enter your todo" 
                value={formData.title} 
                onChange={handleInputChange}
                className="text-black"
            />
            <button type="submit">Add Todo</button>
        </form>
    );
}
