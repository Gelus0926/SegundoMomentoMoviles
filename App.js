import { StyleSheet, Text, Button, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Component, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 

const Usuarios = [
  { id: "0", user: "juan", rol: "admin", password: "admin123" },
  { id: "1", user: "mateo", rol: "user", password: "contra" },
  { id: "2", user: "carlos", rol: "user", password: "cls" },
  { id: "3", user: "mou", rol: "user", password: "az2" },
  { id: "4", user: "gelus", rol: "admin", password: "adm123" },
  { id: "5", user: "cris", rol: "user", password: "4855" },
  { id: "6", user: "clara", rol: "admin", password: "admin" },
  { id: "7", user: "rolo", rol: "user", password: "2020" }
]

function Limpiar() {
  setDatos('')
}

function UserScreen({ navigation }) {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      User:'',
      Rol: '',
      Password: ''
    }
    
  })
  const onSumbit = data => {
   let iniciosesion = InicioSesion(data.User, data.Rol, data.Password)
    console.log(data.User, data.Rol, data.Password);
    console.log(iniciosesion);
    if (iniciosesion.estado) {
      navigation.navigate('Profile', { fullUser: data.User, rol: iniciosesion.rol, id: iniciosesion.id })
      reset()

    }
  }
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>


      <View style ={styles.centerContainer}>
        <Image 
          style = {styles.imgStyle}
          source = {require('./src/img/bank.jpg')}
        />
      </View>


      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            // value={fullUser} 
            // onChangeText={value => setfullUser(value)}
            placeholder={"Ingrese usuario"}
          />
        )}
        name="User" //Estado a validar
      />
      {errors.User?.type == "required" && <Text style={{ color: 'red' }}>El campo identificacion es obligatorio</Text>}
      {errors.User?.type == "pattern" && <Text style={{ color: 'red' }}>Este campo solo es texto</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/,
          
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            // value={fullRol}
            // onChangeText={value => setfullRol(value)}
            placeholder={"Ingrese un rol"}
          />
        )}
        name="Rol" //Estado a validar
      />
      {errors.Rol?.type == "required" && <Text style={{ color: 'red' }}>El campo identificacion es obligatorio</Text>}
      {errors.Rol?.type == "pattern" && <Text style={{ color: 'red' }}>Este campo solo es texto</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[a-z0-9_-]{6,18}$/,
         
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="contraseña"
            secureTextEntry={true}
            onChange={onChange}
            onBlur={onBlur}
            value={value}
            // value={fullPassword}
            // onChangeText={value => setfullPassword(value)}
          />
        )}
        name="Password" //Estado a validar
      />
      {errors.Password?.type == "required" && <Text style={{ color: 'red' }}>La contraseña  es obligatorio</Text>}
      {errors.Password?.type == "pattern" && <Text style={{ color: 'red' }}>Este campo solo es texto</Text>}
      <TouchableOpacity
        style={{ backgroundColor: '#33FFDA', padding: 10, marginTop: 20, width: 90, textAlign: 'center' }}
        onPress={handleSubmit(onSumbit)}
      >
        <Text>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
}

function InicioSesion(user, rol, pass) {
  const id_user = Usuarios.find(usuario => usuario.user == user && rol == "admin" && usuario.rol == rol && usuario.password == pass) ? Usuarios.find(usuario => usuario.user == user && rol == "admin" && usuario.rol == rol && usuario.password == pass).id : false;
  const respuesta = Usuarios.find(usuario => usuario.user == user && rol == "admin" && usuario.rol == rol && usuario.password == pass) ? { estado: true, rol: "admin", id: id_user } : Usuarios.find(usuario => usuario.user == user && rol == "user" && usuario.rol == rol && usuario.password == pass) ? { estado: false, rol: false, id: id_user } : { estado: false, rol: false, id: id_user };
  return respuesta;
}

function ProfileScreen({ route }){
  const [Datos , setDatos] = useState([]);
  const [Cuenta, setCuenta] = useState(((Math.random() * (80 - 1 + 1)) + 1).toFixed());
  const { control, handleSubmit, formState: {errors}   } = useForm({
    defaultValues: {
      Identificacion: 0,
      Titular: '',
      date: '',
      salario: 0
    }
  })

  const onSumbit = data => {
    data.Cuenta=Cuenta
    data.id_user=route.params.id
    console.log(data);
    setDatos(misDatos=>[...misDatos,data])
    console.log(Datos)
  }

  let buscar=()=>{
    let Encontrado = ''
    for (let Registro of Datos) {
      if (Registro.Cuenta == Cuenta) {
        Encontrado = 'Si'
        console.log(Registro)
      }
    }
    if (Encontrado == '') {
      alert("La cuenta no esta registrada");
    }
  }

  return (
    <View style={styles.container}>
      <Text>Perfil: {route.params.fullUser}</Text>
      <Text>rol: {route.params.rol}</Text>
      <Text>id: {route.params.id}</Text>
    
      <TextInput
        style={styles.inputs}
        placeholder="Cuenta"
        value={Cuenta}
      />
    
      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[0-9]+$/,
          maxLength: 200,
          minLength: 7
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Identificacion"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="Identificacion" //Estado a validar
      />
      {errors.Identificacion?.type == "required" && <Text style={{ color: 'red' }}>El campo identificacion es obligatorio</Text>}
      {errors.Identificacion?.type == "pattern" && <Text style={{ color: 'red' }}>Este campo solo es numerico</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Titular de la Cuenta"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="Titular" //Estado a validar
      />
      {errors.Titular?.type == "required" && <Text style={{ color: 'red' }}>Campo Titular Obligatorio</Text>}
      {errors.Titular?.type == "pattern" && <Text style={{ color: 'red' }}>Solo debe de contener letras y espacios</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^(?:(?:(?:0?[1-9]|1\d|2[0-8])[/](?:0?[1-9]|1[0-2])|(?:29|30)[/](?:0?[13-9]|1[0-2])|31[/](?:0?[13578]|1[02]))[/](?:0{2,3}[1-9]|0{1,2}[1-9]\d|0?[1-9]\d{2}|[1-9]\d{3})|29[/]0?2[/](?:\d{1,2}(?:0[48]|[2468][048]|[13579][26])|(?:0?[48]|[13579][26]|[2468][048])00))$/
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="dd/mm/aa"
            type="date"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="date" //Estado a validar
      />
      {errors.date?.type == "required" && <Text style={{ color: 'red' }}>La fecha digitada es incorrecta</Text>}
      {errors.date?.type == "pattern" && <Text style={{ color: 'red' }}>El formato para la fecha es: aa/mm/dd</Text>}

      <Controller
        control={control}
        rules={{
          required: true,
          pattern: /^[0-9]+$/,
          max: 100000000,
          min: 1000000
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={styles.inputs}
            placeholder="Digite el salario"
            onChange={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
        name="salario" //Estado a validar
      />
      {errors.salario?.type == "required" && <Text style={{ color: 'red' }}>El campo salario es obligatorio</Text>}
      {errors.salario?.type == "pattern" && <Text style={{ color: 'red' }}>Este campo solo es numerico</Text>}
      {errors.salario?.type == "max" && <Text style={{ color: 'red' }}>El limite del salario son 10000000</Text>}
      {errors.salario?.type == "min" && <Text style={{ color: 'red' }}>El salario no puede ser menor a 1000000</Text>}

      <TouchableOpacity
        style={{ backgroundColor: '#33FFDA', padding: 10, marginTop: 20, width: 90, textAlign: 'center' }}
        onPress={handleSubmit(onSumbit)}
      >
        <Text>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: '#33FFDA', padding: 10, marginTop: 20, width: 90, textAlign: 'center' }}
        onPress={buscar}
      >
        <Text>Buscar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={{ backgroundColor: '#33FFDA', padding: 10, marginTop: 20, width: 90, textAlign: 'center' }}
        //onPress={()=>Limpiar()}
      >
        <Text>Eliminar</Text>
      </TouchableOpacity>
    </View>
  );
}

function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text>Movimientos</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
      <Button
        title="Perfil"
        onPress={() => navigation.navigate('Feed')}
      />
    </View>
  );
}

function LoginScreen() {
  return (
    <View style={styles.container}>
      <Text>Configuración</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {/* tabBarStyle: desactiva el menú bottom */}
      <Tab.Screen
        name="Inicio"
        component={UserScreen}
        options={{
          title: 'Inicio', tabBarStyle: { display: "none" }, tabBarIcon: ({ color, size }) =>
            <FontAwesome5 name="key" size={24} color="black" />
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil', tabBarIcon: ({ color, size }) =>
            (<MaterialIcons name="admin-panel-settings" size={30} color="black" />)
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'Movimientos', tabBarIcon: ({ color, size }) =>
            <FontAwesome5 name="file-invoice-dollar" size={24} color="black" />
        }}
      />

    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

export default function App(){

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeTabs} options={{ title: 'Sistema Bancario' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputs: {
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    textAlign: 'center',
    marginBottom: 5
  },
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:40
  },
  imgStyle: {
    width:200,
    height:200
  }
});