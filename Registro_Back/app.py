import firebase_admin
from firebase_admin import credentials, auth, firestore
from flask import Flask, request, jsonify


credenciales = credentials.Certificate("credenciales/registro-usuarios-back-firebase-adminsdk-gy86d-a8e4f36360.json") 
firebase_admin.initialize_app(credenciales)


db = firestore.client()

app = Flask(__name__)

@app.route('/registrar', methods=['POST'])
def registrar_usuario():
    try:
       
        datos = request.get_json()
        nombre = datos.get('nombre')
        documento = datos.get('documento')
        telefono = datos.get('telefono')
        direccion = datos.get('direccion')
        correo = datos.get('correo')
        contrasena = datos.get('contrasena')
        nombre_usuario = datos.get('nombre_usuario')

        # Crear usuario en Firebase Authentication
        usuario = auth.create_user(
            email=correo,
            password=contrasena,
            display_name=nombre 
        )

        # Guardar la información del usuario en Firestore
        datos_usuario = {
            "nombre": nombre,
            "documento": documento,
            "telefono": telefono,
            "direccion": direccion,
            "correo": correo,
            "nombre_usuario": nombre_usuario,
            "uid": usuario.uid,  
        }

        # Almacenar la información en Firestore
        db.collection('usuarios').document(usuario.uid).set(datos_usuario)

        # Devolver una respuesta 
        return jsonify({"mensaje": "Usuario registrado exitosamente", "uid": usuario.uid}), 201

    except Exception as error:
        # Devolver un mensaje de error
        return jsonify({"error": str(error)}), 400


# Ruta para obtener información de un usuario por su UID
@app.route('/usuarios/<uid>', methods=['GET'])
def obtener_usuario(uid):
    try:
        # Obtener el documento del usuario por su UID
        usuario_ref = db.collection('usuarios').document(uid).get()

        
        if usuario_ref.exists:
            
            return jsonify(usuario_ref.to_dict()), 200
        else:
            return jsonify({"error": "Usuario no encontrado"}), 404

    except Exception as error:
        # Manejar cualquier error
        return jsonify({"error": str(error)}), 500


# Ruta para obtener todos los usuarios
@app.route('/usuarios', methods=['GET'])
def obtener_todos_los_usuarios():
    try:
        # Obtener todos los documentos de la colección 'usuarios'
        usuarios = db.collection('usuarios').stream()

        # Convertir los datos a una lista
        lista_usuarios = [usuario.to_dict() for usuario in usuarios]

      
        return jsonify(lista_usuarios), 200

    except Exception as error:
        return jsonify({"error": str(error)}), 500


# Ejecutar
if __name__ == '__main__':
    app.run(host="127.0.0.1", port=4000)

