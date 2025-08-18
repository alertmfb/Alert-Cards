import { useEffect } from "react";
import { useNavigate } from "react-router";

const Cards = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("all-cards", { replace: true });
  }, [navigate]);

  return null;
};

export default Cards;
