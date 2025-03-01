import React from "react";

const Overview = async ({ params }) => {
  const { id } = await params;
  return <div>Overview {id} </div>;
};

export default Overview;
