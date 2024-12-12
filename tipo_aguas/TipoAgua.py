
import os
from flask import Flask, request, jsonify
import firebase_admin
from firebase_admin import credentials, firestore
from firebase_admin.exceptions import FirebaseError

# Inicializar Flask
app = Flask(__name__)

# Inicializar Firebase
try:
    cred_path = "C:/Users/PC/Documents/tipo_aguas/credenciales.json"  # Ruta al archivo JSON
    cred = credentials.Certificate(cred_path)
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    
    print("Firebase inicializado correctamente.")

except FileNotFoundError:
    print("Error: No se encontró el archivo de credenciales JSON.")

except Exception as e:
    print(f"Error al inicializar Firebase: {e}")

class TipoAgua:
    TIPOS_VALIDOS = ['Natural', 'Potable', 'Residual']  # Tipos válidos predefinidos

    @staticmethod
    def generar_nuevo_id():
        try:
            
            # Obtener el documento de configuración (contador)
            contador_ref = db.collection('configuracion').document('contador_tipos_agua')
            contador_doc = contador_ref.get()

            if contador_doc.exists:
                # Si el contador ya existe, incrementarlo
                contador = contador_doc.to_dict().get('contador', 0) + 1
            else:
                # Si no existe, inicializar en 1
                contador = 1

            # Actualizar el contador en Firestore
            contador_ref.set({'contador': contador})

            # Generar el ID en el formato H01, H02, etc.
            nuevo_id = f"H{contador:02}"
            return nuevo_id
        except FirebaseError as e:
            print(f"Firebase Error al generar nuevo ID: {e}")
            return None
        except Exception as e:
            print(f"Error inesperado al generar nuevo ID: {e}")
            return None

    @staticmethod
    def agregar_tipo_agua(nombre, descripcion):
        try:
            # Validar el tipo de agua
            if nombre not in TipoAgua.TIPOS_VALIDOS:
                nombre = "Otro"  # Si no es válido, se asigna "Otro"

            # Generar el ID personalizado
            nuevo_id = TipoAgua.generar_nuevo_id()
            if not nuevo_id:
                return "Error al generar el ID."

            # Crear el documento con el ID generado
            doc_ref = db.collection('tipos_agua').document(nuevo_id)
            doc_ref.set({
                'nombre': nombre,
                'descripcion': descripcion
            })
            return f"Tipo de agua agregado correctamente con ID: {nuevo_id}"
        except FirebaseError as e:
            return f"Firebase Error: {e}"
        except Exception as e:
            return f"Error inesperado: {e}"

    @staticmethod
    def obtener_tipos_agua():
        try:
            tipos = db.collection('tipos_agua').get()
            lista_tipos = [
                {'id': tipo.id, 'nombre': tipo.to_dict().get('nombre'), 'descripcion': tipo.to_dict().get('descripcion')}
                for tipo in tipos
            ]
            return lista_tipos
        except FirebaseError as e:
            return f"Firebase Error: {e}"
        except Exception as e:
            return f"Error inesperado: {e}"

# Rutas de la API
@app.route('/tipos-agua', methods=['GET'])
def get_tipos_agua():
    tipos = TipoAgua.obtener_tipos_agua()
    
    if isinstance(tipos, str):  # Esto indica que hubo un error
        return jsonify({"error": tipos}), 500  # Error interno del servidor

    return jsonify(tipos), 200

@app.route('/tipos-agua', methods=['POST'])
def add_tipo_agua():
    data = request.get_json()
    nombre = data.get('nombre')
    descripcion = data.get('descripcion')
    
    if not nombre or not descripcion:
        return jsonify({"error": "El nombre y la descripción son obligatorios."}), 400
    
    result = TipoAgua.agregar_tipo_agua(nombre, descripcion)
    
    if 'Error' in result:
        return jsonify({"error": result}), 500  # Error interno del servidor
    return jsonify({"message": result}), 201  # Se devuelve el código de estado 201 cuando se crea un recurso

# Iniciar el servidor
if __name__ == '__main__':
    try:
        app.run(debug=True)
    except Exception as e:
        print(f"Error al iniciar el servidor: {e}")
