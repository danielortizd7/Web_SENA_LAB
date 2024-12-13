from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore

# Inicializar la aplicación Flask
app = Flask(__name__)

# Configurar Firebase
credenciales = credentials.Certificate("credenciales/gestion-roles-firebase-adminsdk-agye8-ab5b2edb15.json")
firebase_admin.initialize_app(credenciales)
db = firestore.client()

# Roles predefinidos
ROLES_PREDEFINIDOS = [
    {"id_rol": "super_admi", "nombre_rol": "Super Administrador"},
    {"id_rol": "Admi", "nombre_rol": "Administrador"},
    {"id_rol": "laboratorista", "nombre_rol": "Laboratorista"},
    {"id_rol": "cliente", "nombre_rol": "Cliente"}
]

# Función para inicializar roles predefinidos
def inicializar_roles():
    for rol in ROLES_PREDEFINIDOS:
        rol_ref = db.collection('roles').document(rol["id_rol"])
        if not rol_ref.get().exists:
            rol_ref.set(rol)

# Llamar a esta función al iniciar el servidor
inicializar_roles()

# Endpoint para obtener todos los roles
@app.route('/roles', methods=['GET'])
def obtener_roles():
    try:
        roles = db.collection('roles').stream()
        lista_roles = [rol.to_dict() for rol in roles]
        return jsonify(lista_roles), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint para agregar un nuevo rol
@app.route('/nuevo_rol', methods=['POST'])
def agregar_rol():
    try:
        datos = request.get_json()
        id_rol = datos.get('id_rol')
        nombre_rol = datos.get('nombre_rol')

        # Verificar que no exista un rol con el mismo ID
        rol_ref = db.collection('roles').document(id_rol)
        if rol_ref.get().exists:
            return jsonify({"error": "El rol ya existe"}), 400

        # Guardar el nuevo rol
        nuevo_rol = {"id_rol": id_rol, "nombre_rol": nombre_rol}
        rol_ref.set(nuevo_rol)

        return jsonify({"mensaje": "Rol creado exitosamente", "rol": nuevo_rol}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpoint para obtener un rol por ID
@app.route('/roles/<id_rol>', methods=['GET'])
def obtener_rol(id_rol):
    try:
        rol_ref = db.collection('roles').document(id_rol).get()
        if not rol_ref.exists:
            return jsonify({"error": "Rol no encontrado"}), 404
        return jsonify(rol_ref.to_dict()), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Iniciar el servidor
if __name__ == '__main__':
    app.run(debug=True)
