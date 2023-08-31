"use client"

import React, { useState } from 'react';

const ContactPage: React.FC = () => {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
      file: null as File | null, 
    });
  
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file && file.type === 'application/pdf') {
        setFormData((prevData) => ({
          ...prevData,
          file: file,
        }));
      } else {
        alert('Por favor, selecione um arquivo PDF válido.');
      }
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      console.log('Form Data:', formData);
      return null;
    };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form className="max-w-md w-full p-6 bg-white border-2 rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold mb-4">Entre em contato</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="name">
            Nome
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="email">
            Email
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="message">
            Mensagem
          </label>
          <textarea
            className="w-full p-2 border rounded-md"
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium" htmlFor="file">
            Arquivo PDF
          </label>
          <input
            className="w-full p-2 border rounded-md"
            type="file"
            id="file"
            name="file"
            accept=".pdf"
            onChange={handleFileChange}
            required
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default ContactPage;
