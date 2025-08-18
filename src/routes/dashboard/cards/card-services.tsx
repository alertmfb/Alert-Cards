import { useEffect } from "react";
import { useNavigate } from "react-router";

const CardServices = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/cards/all-cards", { replace: true });
  }, [navigate]);

  return null;
};

export default CardServices;
