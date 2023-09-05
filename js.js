function obtenerDatos() {
  fetch("https://reqres.in/api/users")
    .then((res) => res.json())
    .then((datos) => {
      const userList = document.getElementById("userList");
      datos.data.forEach((usuario) => {
        userList.innerHTML += `
            <tr>
                <td>${usuario.id}</td>
                <td>${usuario.email}</td>
                <td>${usuario.first_name}</td>
                <td>${usuario.last_name}</td>
                <td><img src="${usuario.avatar}" alt="Avatar"></td>
                <td>
                <button type="button" class="btn btn-warning m-2">Editar</button>
                <button type="button" class="btn btn-danger m-2">Eliminar</button>
                </td>
            <tr>
          `;
      });
    });
}

const dataForm = document.getElementById("createForm");
dataForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(dataForm);

  // Objeto con los datos del formulario
  const newData = {
    id: 0,
    email: formData.get("email"),
    first_name: formData.get("first_name"),
    last_name: formData.get("last_name"),
    avatar: formData.get("avatar"),
  };

  // Enviar los datos utilizando Fetch con el método POST
  fetch("https://reqres.in/api/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((response) => response.json())
    .then((data) => {
      obtenerDatos();
      console.log("Datos enviados con éxito:", data);
    })
    .catch((error) => {
      console.error("Error al enviar datos:", error);
    });
});
