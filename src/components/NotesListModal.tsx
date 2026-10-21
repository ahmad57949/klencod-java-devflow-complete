import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NoteItem } from '../types';
import {
  X,
  StickyNote,
  Plus,
  Trash2,
  Edit3,
  Clock,
  Save,
  CheckCircle2,
} from 'lucide-react';

export const NotesListModal: React.FC = () => {
  const { setActiveModal, notes, addNote, updateNote, deleteNote } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleOpenAdd = () => {
    setEditingId(null);
    setTitle('');
    setContent('');
    setIsEditing(true);
  };

  const handleOpenEdit = (note: NoteItem) => {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content || '');
    setIsEditing(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingId) {
      updateNote(editingId, title.trim(), content.trim());
    } else {
      addNote(title.trim(), content.trim());
    }

    setIsEditing(false);
    setEditingId(null);
    setTitle('');
    setContent('');
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (window.confirm('هل تريد حذف هذه الملاحظة نهائياً؟')) {
      deleteNote(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-4 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D467D] to-[#1E609A] text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/15 flex items-center justify-center border border-white/20">
              <StickyNote className="w-5 h-5 text-sky-200" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">قائمة الملاحظات اليومية</h3>
              <p className="text-xs text-sky-200">تدوين مهام المخزن، تفريغ الشحنات وتذكيرات السائقين</p>
            </div>
          </div>

          <button
            onClick={() => setActiveModal(null)}
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white transition-colors cursor-pointer text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5">
          {isEditing ? (
            /* Create and Edit screen matching CreateandeditActivity.java */
            <form onSubmit={handleSave} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-sm font-bold text-[#0D467D]">
                  {editingId ? 'تعديل الملاحظة' : 'إنشاء ملاحظة جديدة'}
                </h4>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  إلغاء
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  عنوان الملاحظة <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: مراجعة شحنة حديد التسليح وتأكيد الوزن على القبان..."
                  className="w-full px-4 py-2.5 rounded-2xl bg-[#F9FAFD] border border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-[#0D467D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  التفاصيل والمحتوى
                </label>
                <textarea
                  rows={4}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="اكتب أية تفاصيل، أرقام شاحنات، أو تعليمات إضافية..."
                  className="w-full p-4 rounded-2xl bg-[#F9FAFD] border border-slate-200 text-xs sm:text-sm text-slate-700 focus:outline-none focus:border-[#0D467D] resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-bold cursor-pointer"
                >
                  تراجع
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#0D467D] text-white text-xs font-bold hover:bg-[#0A3866] transition-colors shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ الملاحظة</span>
                </button>
              </div>
            </form>
          ) : notes.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <StickyNote className="w-8 h-8" />
              </div>
              <p className="text-sm font-bold text-slate-700">لا توجد ملاحظات مسجلة</p>
              <button
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D467D] text-white text-xs font-bold cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة أول ملاحظة</span>
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onClick={() => handleOpenEdit(note)}
                  className="p-4 rounded-2xl bg-[#F9FAFD] hover:bg-white border border-slate-100 hover:border-slate-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer group flex items-start justify-between gap-3"
                >
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#0D467D] transition-colors mb-1">
                      {note.title}
                    </h4>
                    {note.content && (
                      <p className="text-xs text-slate-500 line-clamp-2 mb-2">
                        {note.content}
                      </p>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {note.time}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenEdit(note);
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-[#0D467D] hover:bg-slate-100 cursor-pointer"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, note.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEditing && (
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between shrink-0">
            <span className="text-xs text-slate-400">
              {notes.length} ملاحظات محفوظة
            </span>
            <button
              onClick={handleOpenAdd}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0D467D] text-white text-xs font-bold hover:bg-[#0A3866] transition-colors cursor-pointer shadow-xs active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>ملاحظة جديدة</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
