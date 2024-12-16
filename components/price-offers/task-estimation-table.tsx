

const tasks = [
  { name: "Login", hours: 2 },
  { name: "Dashboard récap Accueil", hours: 6},
  { name: "Tableau de Bord RH Accueil", hours: 6},
  { name: "Tableau de bord principal", hours: 3 },
  { name: "Tableau de bord détail par pôle", hours: 4 },
  { name: "Tableau de bord progression carrière", hours: 3 },
  { name: "Actions Correctives", hours: 8 },
  { name: "Vue par équipes", hours: 4 },
  { name: "Analyse par facteurs", hours: 3},
  { name: "Vue globale du marché", hours: 13 },
];

const hourlyRate = 330; // Taux horaire en euros

const TaskEstimationTable: React.FC = () => {
  return (
    <div className=" ]  mx-auto p-6 bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-100 mb-4">
        Offre de Prix
      </h2>
      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-700 text-gray-100">
            <th className="border border-gray-700 px-4 py-2 text-left">Vues</th>
            <th className="border border-gray-700 px-4 py-2 text-right">Jours Estimés</th>
            <th className="border border-gray-700 px-4 py-2 text-right">Coût Estimé (€)</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}
            >
              <td className="border border-gray-700 px-4 py-2 text-gray-300">
                {task.name}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-gray-300 text-right">
                {task.hours}
              </td>
              <td className="border border-gray-700 px-4 py-2 text-gray-300 text-right">
                {(task.hours * hourlyRate).toFixed(2)} €
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-gray-700 text-gray-100 font-bold">
            <td className="border border-gray-700 px-4 py-2">Total</td>
            <td className="border border-gray-700 px-4 py-2 text-right">
              {tasks.reduce((sum, task) => sum + task.hours, 0)}
            </td>
            <td className="border border-gray-700 px-4 py-2 text-right">
              {tasks.reduce((sum, task) => sum + task.hours * hourlyRate, 0).toFixed(2)} €
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default TaskEstimationTable;
