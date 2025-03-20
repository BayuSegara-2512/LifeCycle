import { useJadwal } from "../context/JadwalContext";
import { useState } from "react";

const KomponenJadwal = ({ jdwl }) => {
  const { hapusJadwal, editJadwal } = useJadwal();
  const [isEditing, setIsEditing] = useState(false);
  const [tugasBaru, setTugasBaru] = useState(jdwl.tugas);

  const handleEdit = () => {
    editJadwal(jdwl.id, tugasBaru);
    setIsEditing(false);
  };

  return (
    <li>
      {isEditing ? (
        <input
          type="text"
          value={tugasBaru}
          onChange={(e) => setTugasBaru(e.target.value)}
        />
      ) : (
        <span>{jdwl.tugas}</span>
      )}
      <button onClick={() => hapusJadwal(jdwl.id)}>Hapus</button>
      {isEditing ? (
        <button onClick={handleEdit}>Simpan</button>
      ) : (
        <button onClick={() => setIsEditing(true)}>Edit</button>
      )}
    </li>
  );
};

export default KomponenJadwal;
