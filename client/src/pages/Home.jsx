import { useState, useEffect } from "react";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import axios from "axios";
import toast from "react-hot-toast";
import Card from "../components/Card";

const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

const Home = () => {
  const [reminderMsg, setReminderMsg] = useState("");
  const [remindeAt, setRemindeAt] = useState();
  const [reminders, setReminders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("API Base URL:", baseURL);
  }, []);

  const fetchReminders = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`${baseURL}/api/v1/`);
      if (res?.data.success) {
        setReminders(res.data.reminders);
      }
    } catch (error) {
      console.error("Failed to fetch reminders:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Failed to fetch reminders"}`);
      } else if (error.request) {
        toast.error("Cannot connect to server. Is it running?");
      } else {
        toast.error("Failed to fetch reminders");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReminder = async () => {
    if (!reminderMsg || !remindeAt) {
      toast.error("Please enter reminder message and date/time.", { icon: "⚠️" });
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${baseURL}/api/v1/add`, {
        reminderMsg,
        remindAt: remindeAt,
      });

      if (res?.data.success) {
        setReminderMsg("");
        setRemindeAt(null);
        fetchReminders();
        toast.success("Reminder added successfully!", { icon: "✅", duration: 3000 });
      }
    } catch (error) {
      console.error("Failed to add reminder:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Failed to add reminder"}`, { icon: "❌" });
      } else if (error.request) {
        toast.error("Cannot connect to server. Make sure backend is running on port 5000", { icon: "🔌" });
      } else {
        toast.error("Failed to add reminder");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReminder = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.delete(`${baseURL}/api/v1/${id}`);
      if (res?.data.success) {
        fetchReminders();
        toast.success("Reminder deleted successfully!", { icon: "🗑️" });
      }
    } catch (error) {
      console.error("Failed to delete reminder:", error);
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Failed to delete reminder"}`);
      } else {
        toast.error("Cannot connect to server");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReminders();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex flex-col items-center py-12 px-4">
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-full mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Remind Me</h1>
        <p className="text-gray-600">Never forget important tasks again</p>
      </div>

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg space-y-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
          <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Create New Reminder
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reminder Message</label>
            <input type="text" placeholder="e.g., Buy groceries, Call mom, Meeting..." value={reminderMsg} onChange={(e) => setReminderMsg(e.target.value)} disabled={isLoading} className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-50 transition-all duration-200" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date & Time</label>
            <div className="border-2 border-gray-200 rounded-lg p-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-transparent transition-all duration-200">
              <DateTimePicker value={remindeAt} onChange={setRemindeAt} minDate={new Date()} minutePlaceholder="mm" hourPlaceholder="hh" dayPlaceholder="DD" monthPlaceholder="MM" yearPlaceholder="YYYY" className="w-full" disabled={isLoading} format="dd/MM/yyyy hh:mm a" />
            </div>
          </div>

          <button onClick={handleAddReminder} disabled={isLoading} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Reminder
              </>
            )}
          </button>
        </div>
      </div>

      <div className="mt-12 w-full max-w-lg space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            My Reminders
          </h2>
          {reminders.length > 0 && (
            <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-semibold">
              {reminders.length} {reminders.length === 1 ? 'reminder' : 'reminders'}
            </span>
          )}
        </div>

        {reminders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center border border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-4">
              <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No reminders yet</h3>
            <p className="text-gray-500">Create your first reminder to get started!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reminders.map((reminder, index) => (
              <Card key={reminder._id} index={index} note={reminder.reminderMsg} time={new Date(reminder.remindAt).toLocaleString("en-GB", { timeZone: "Asia/Kolkata", day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })} onDelete={() => handleDeleteReminder(reminder._id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;