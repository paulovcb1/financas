import React from 'react';

interface EditModalProps {
  title: string;
  fields: { label: string; name: string; value: string }[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const EditModal: React.FC<EditModalProps> = ({ title, fields, onChange, onSave, onCancel }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg w-full max-w-md">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.name}>
            <label className="text-gray-300">{field.label}</label>
            <input
              type="number"
              name={field.name}
              value={field.value}
              onChange={onChange}
              className="w-full bg-gray-700 text-gray-100 border border-gray-600 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
);