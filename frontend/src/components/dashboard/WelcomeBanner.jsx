// ===============================
// Imports
// ===============================

import Card from "../common/Card";

// ===============================
// Component
// ===============================

const WelcomeBanner = () => {

  // Temporary placeholder
  const user = {
    name: "Krish",
  };

  const hour = new Date().getHours();

  let greeting = "Hello";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (

    <Card>

      <div className="flex flex-col gap-2">

        <h1 className="text-3xl font-bold text-slate-800">

          {greeting},{" "}
          <span className="text-blue-600">
            {user.name}
          </span>
          👋

        </h1>

        <p className="text-slate-500">

          Welcome back to DermAssist AI.
          Let's keep your skin healthy today.

        </p>

      </div>

    </Card>

  );

};

// ===============================
// Export
// ===============================

export default WelcomeBanner;