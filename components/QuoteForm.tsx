import React, { useState } from 'react';
import { Send, Calendar, Users, PartyPopper, User, Phone, FileText } from 'lucide-react';
import { COMPANY_INFO } from '../constants';

export const QuoteForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '',
    type: 'Casamento',
    observation: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Formata a data para o formato brasileiro (dia/mês/ano) se possível
    let formattedDate = formData.date;
    if (formData.date) {
        const dateObj = new Date(formData.date);
        formattedDate = dateObj.toLocaleDateString('pt-BR');
    }

    // Cria a mensagem para o WhatsApp
    const message = `*Olá! Gostaria de solicitar um orçamento.*\n\n` +
      `👤 *Nome:* ${formData.name}\n` +
      `📱 *Telefone:* ${formData.phone}\n` +
      `🎉 *Tipo de Evento:* ${formData.type}\n` +
      `📅 *Data:* ${formattedDate}\n` +
      `👥 *Convidados:* Aprox. ${formData.guests}\n` +
      `📝 *Observações:* ${formData.observation || 'Nenhuma'}`;

    // Limpa o número da empresa
    const cleanPhone = COMPANY_INFO.phone.replace(/\D/g, '');
    
    // Codifica a mensagem para URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/55${cleanPhone}?text=${encodedMessage}`;

    // Abre o WhatsApp em uma nova aba
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full min-h-[80vh] bg-gray-50 py-12 px-4 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-xl overflow-hidden max-w-4xl w-full flex flex-col md:flex-row">
        
        {/* Coluna Visual / Info */}
        <div className="bg-[#CC0000] text-white p-8 md:p-12 md:w-1/3 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-6">Vamos planejar seu evento?</h2>
            <p className="text-red-100 text-lg mb-8 font-light">
              Preencha o formulário ao lado. Nós receberemos seus dados diretamente no WhatsApp para um atendimento mais ágil e personalizado.
            </p>
          </div>
          <div className="space-y-4 text-red-50 text-sm">
            <p className="flex items-center gap-2">
              <Phone className="w-4 h-4" /> {COMPANY_INFO.phone}
            </p>
            <p className="opacity-80">Seg - Sex: 9h às 18h</p>
          </div>
        </div>

        {/* Coluna Formulário */}
        <div className="p-8 md:p-12 md:w-2/3">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Nome */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <User className="w-4 h-4 text-red-500" /> Nome Completo
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="Seu nome"
                />
              </div>

              {/* Telefone */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Phone className="w-4 h-4 text-red-500" /> WhatsApp / Telefone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="(11) 99999-9999"
                />
              </div>

              {/* Tipo de Evento */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <PartyPopper className="w-4 h-4 text-red-500" /> Tipo de Evento
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                >
                  <option value="Casamento">Casamento</option>
                  <option value="Pré-Wedding">Ensaio Pré-Wedding</option>
                  <option value="Debutante">Festa de 15 Anos (Debutante)</option>
                  <option value="Ensaio">Ensaio Fotográfico</option>
                  <option value="Corporativo">Evento Corporativo</option>
                  <option value="Infantil">Festa Infantil</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              {/* Data */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Calendar className="w-4 h-4 text-red-500" /> Data do Evento
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white text-gray-600"
                />
              </div>

              {/* Convidados */}
              <div className="space-y-2 md:col-span-2">
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Users className="w-4 h-4 text-red-500" /> Quantidade de Pessoas (Aprox.)
                </label>
                <input
                  type="number"
                  name="guests"
                  required
                  min="1"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                  placeholder="Ex: 150"
                />
              </div>
            </div>

            {/* Observações */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-red-500" /> Observações ou Dúvidas
              </label>
              <textarea
                name="observation"
                rows={3}
                value={formData.observation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white resize-none"
                placeholder="Conte um pouco mais sobre o que você deseja..."
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-[#25D366] hover:bg-[#1ebc57] text-white font-bold py-4 rounded-lg shadow-lg transform transition hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
            >
              <Send className="w-5 h-5" />
              Enviar Orçamento pelo WhatsApp
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};