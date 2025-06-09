'use client'

type Task = {
  id: number
  title: string
  assigned_to: number
  assigned_user: string
  priority: number
  deadline: string
  is_completed: boolean
}

interface TaskTableProps {
  tasks: Task[]
}

export default function TaskTable({ tasks }: TaskTableProps) {
  return (
    <section className="w-full p-6 rounded-xl space-y-4">
      <h2 className="text-2xl font-bold text-center mb-4">All Tasks</h2>
      <div className="max-h-96 overflow-auto">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-muted text-muted-foreground">
            <tr>
              <th className="text-left px-2 py-3">Title</th>
              <th className="text-left px-2 py-3 hidden sm:table-cell">Assigned</th>
              <th className="text-left px-2 py-3 hidden md:table-cell">Priority</th>
              <th className="text-left px-2 py-3 hidden lg:table-cell">Deadline</th>
              <th className="text-left px-2 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-t hover:bg-accent/30 transition-colors">
                <td className="px-2 py-2 break-words max-w-[150px]">{task.title}</td>
                <td className="px-2 py-2 hidden sm:table-cell">{task.assigned_user}</td>
                <td className="px-2 py-2 hidden md:table-cell">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 1
                        ? 'bg-green-100 text-green-800'
                        : task.priority === 2
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {task.priority === 1 ? 'Low' : task.priority === 2 ? 'Medium' : 'High'}
                  </span>
                </td>
                <td className="px-2 py-2 hidden lg:table-cell">
                  {new Date(task.deadline).toLocaleDateString()}
                </td>
                <td className="px-2 py-2">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      task.is_completed ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {task.is_completed ? 'Done' : 'Pending'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
