from flask import Flask, request, jsonify
from firebase_admin import credentials, firestore, initialize_app

# Inicializar Flask
app = Flask(__name__)

# Inicializar Firebase con credenciales
cred = credentials.Certificate('config/firebase-adminsdk.json')  # Asegúrate de que esta ruta sea correcta
initialize_app(cred)

# Crear una referencia a la base de datos Firestore
db = firestore.client()
muestras_ref = db.collection('muestras')  # Referencia a la colección "muestras"

# Endpoint para obtener todas las muestras (GET)
@app.route('/listar_muestras', methods=['GET'])
def listar_muestras():
    try:
        # Obtener todas las muestras desde Firestore
        muestras = [doc.to_dict() for doc in muestras_ref.stream()]
        return jsonify(muestras), 200  # Devuelve las muestras en formato JSON con un código 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500  # Devuelve el error en caso de problemas

# Endpoint para registrar una nueva muestra (POST)
@app.route('/registrar_muestra', methods=['POST'])
def registrar_muestra():
    try:
        # Obtener los datos de la solicitud POST
        datos = request.json

        # Extraer los campos enviados
        nueva_muestra = {
            "cedula_cliente": datos.get("cedula_cliente"),
            "tipo_agua": datos.get("tipo_agua"),
            "especificar_tipo_agua": datos.get("especificar_tipo_agua"),
            "fecha_hora": datos.get("fecha_hora"),
            "id_muestra": datos.get("id_muestra"),
            "tipo_muestreo": datos.get("tipo_muestreo"),
            "analisis_realizar": datos.get("analisis_realizar")
        }

        # Validar que todos los campos estén presentes
        if not all(nueva_muestra.values()):
            return jsonify({"mensaje": "Todos los campos son obligatorios"}), 400

        # Guardar la nueva muestra en Firestore
        muestras_ref.document(nueva_muestra["id_muestra"]).set(nueva_muestra)

        return jsonify({"mensaje": "Muestra registrada exitosamente", "id_muestra": nueva_muestra["id_muestra"]}), 201

    except Exception as e:
        return jsonify({"mensaje": "Error al registrar la muestra", "error": str(e)}), 500

# Ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)