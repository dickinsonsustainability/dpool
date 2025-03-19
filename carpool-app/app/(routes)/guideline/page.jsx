import React from "react";

function Guideline() {
  return (
    <div className="rounded-2xl bg-card p-5 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Dickinson Carpool Community Guideline</h2>
      <p className="mb-4">
        Dickinson College is committed to fostering a sustainable and inclusive campus community. The D-Pool initiative aims to reduce single-occupancy vehicle usage, decrease carbon emissions, and strengthen community bonds among students, faculty, and staff. This guideline outlines the expectations and responsibilities for all D-Pool participants to ensure a safe, respectful, and efficient carpooling experience.
      </p>

      <h3 className="text-lg font-semibold mb-2">User Responsibilities</h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <strong>Account Information:</strong> Maintain accurate and up-to-date profile information, including contact details, vehicle information, and preferred carpooling routes.
        </li>
        <li>
          <strong>Safe Driving:</strong> Adhere to all traffic laws and regulations. Maintain your vehicle in good condition and ensure it is properly insured.
        </li>
        <li>
          <strong>Communication:</strong> Communicate clearly and promptly with carpool partners regarding schedule changes, cancellations, or other relevant information.
        </li>
        <li>
          <strong>Respect for Others:</strong> Treat all carpool members with courtesy and respect. Avoid disruptive behavior, loud music, or strong odors.
        </li>
        <li>
          <strong>Shared Expenses:</strong> Establish fair and transparent arrangements for sharing carpooling costs (gas, tolls, parking).
        </li>
        <li>
          <strong>Emergency Preparedness:</strong> Have a basic emergency kit in your vehicle and discuss emergency procedures with your carpool partners.
        </li>
      </ol>

      <div className="my-4" />

      <h3 className="text-lg font-semibold mb-2">Carpooling Etiquette</h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <strong>Punctuality:</strong> Be on time for pick-ups and drop-offs.
        </li>
        <li>
          <strong>Cleanliness:</strong> Maintain a clean and tidy carpool environment.
        </li>
        <li>
          <strong>Distractions:</strong> Minimize distractions while driving, such as using cell phones or eating.
        </li>
        <li>
          <strong>Rider Behavior:</strong> As a rider, be considerate of the driver's time and space.
        </li>
        <li>
          <strong>Driver Responsibilities:</strong> Create a safe and comfortable environment for passengers.
        </li>
      </ol>

      <div className="my-4" />

      <h3 className="text-lg font-semibold mb-2">Platform Usage</h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <strong>Postings:</strong> Create clear and informative carpool postings, including departure/arrival points, times, number of seats available, and any preferences (smoking, pets, music).
        </li>
        <li>
          <strong>Communication:</strong> Use the D-Pool platform messaging system for efficient communication with carpool partners.
        </li>
        <li>
          <strong>Privacy:</strong> Protect personal information and avoid sharing sensitive details publicly.
        </li>
      </ol>

      <div className="my-4" />

      <h3 className="text-lg font-semibold mb-2">Dispute Resolution</h3>
      <ol className="list-decimal pl-5 space-y-2">
        <li>
          <strong>Communication:</strong> Attempt to resolve disputes amicably through open communication.
        </li>
        <li>
          <strong>Mediation:</strong> Utilize the D-Pool platform mediation services if necessary.
        </li>
        <li>
          <strong>Reporting Issues:</strong> Report any violations of the guidelines to D-Pool administrators.
        </li>
      </ol>

      <div className="my-4" />

      <h3 className="text-lg font-semibold mb-2">Disclaimer</h3>
      <p>
        D-Pool is a platform to connect potential carpool partners. The college assumes no liability for accidents, injuries, or damages arising from carpooling activities. Participants are encouraged to exercise caution and good judgment.
      </p>

      <div className="my-4" />
      <p className="font-bold">
        By using the D-Pool platform, you agree to abide by these guidelines.
      </p>
    </div>
  );
}

export default Guideline;
