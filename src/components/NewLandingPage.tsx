"use client";
import FormSubmit from "@/components/FormSubmit";
import Link from "next/link";
import { useState, useEffect } from "react";

const NewLandingPage = () => {
  const [stats, setStats] = useState({ users: 0, duplicates: 0, savings: 0 });

  // Animación de números
  useEffect(() => {
     const animateNumbers = () => {
       const targetStats = { users: 342, duplicates: 89, savings: 2340 };
       const duration = 2000;
       const steps = 60;
       const stepDuration = duration / steps;

       let currentStep = 0;
       const interval = setInterval(() => {
         currentStep++;
         const progress = currentStep / steps;
         const easeOut = 1 - Math.pow(1 - progress, 3);

         setStats({
           users: Math.floor(targetStats.users * easeOut),
           duplicates: Math.floor(targetStats.duplicates * easeOut),
           savings: Math.floor(targetStats.savings * easeOut),
         });

         if (currentStep >= steps) {
           clearInterval(interval);
         }
       }, stepDuration);

       return () => clearInterval(interval);
     };

    const timer = setTimeout(animateNumbers, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4">
        {/* Background Pattern */}
        <div className={`absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e0e7ff" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40`}></div>
        
        <div className="relative max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            En desarrollo - Acceso anticipado
          </div>

           {/* Main Headline */}
           <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
             ¿Cuánto dinero te están
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-600">
               {" "}cobrando de más?
             </span>
           </h1>

           {/* Subheadline */}
           <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
             Pronto lanzamos Chequealo: una herramienta que detecta automáticamente cargos duplicados, 
             suscripciones ocultas y errores en tu resumen de tarjeta. <strong>Sin compartir datos bancarios.</strong>
           </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
             <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
               <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                 {stats.users}+
               </div>
               <div className="text-gray-600 font-medium">En la waitlist</div>
             </div>
             <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
               <div className="text-3xl md:text-4xl font-bold text-red-500 mb-2">
                 {stats.duplicates}%
               </div>
               <div className="text-gray-600 font-medium">Tendrán duplicados</div>
             </div>
             <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
               <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                 ${stats.savings.toLocaleString()}
               </div>
               <div className="text-gray-600 font-medium">Ahorro potencial</div>
             </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <FormSubmit />
             <p className="text-sm text-gray-500">
               🔒 100% Seguro • ⚡ Resultados en segundos • 🚀 Acceso anticipado
             </p>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              La realidad que nadie te cuenta
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Los bancos y comercios cometen errores. Y vos los pagás.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">😤</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Cargos duplicados silenciosos
                  </h3>
                  <p className="text-gray-600">
                    El 15% de los usuarios tiene al menos un cargo duplicado por mes. 
                    La mayoría no se da cuenta.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🤔</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Suscripciones que olvidaste
                  </h3>
                  <p className="text-gray-600">
                    Netflix, Spotify, gym... se acumulan sin que te des cuenta. 
                    $2,000+ por mes en suscripciones &quot;fantasma&quot;.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl">😰</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Errores de cuotas
                  </h3>
                  <p className="text-gray-600">
                    Te cobran todas las cuotas juntas o te cobran de más. 
                    Los errores de procesamiento son más comunes de lo que pensás.
                  </p>
                </div>
              </div>
            </div>

            {/* Visual Problem */}
            <div className="bg-gray-50 rounded-2xl p-8 border-2 border-dashed border-gray-300">
              <div className="text-center">
                <div className="text-6xl mb-4">📱</div>
                <h4 className="text-lg font-semibold text-gray-700 mb-4">
                  Tu resumen actual
                </h4>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <span className="text-sm">Netflix</span>
                    <span className="text-sm font-medium">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <span className="text-sm">Netflix</span>
                    <span className="text-sm font-medium text-red-500">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <span className="text-sm">Gym XYZ</span>
                    <span className="text-sm font-medium">$3,500</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg border">
                    <span className="text-sm">Gym XYZ</span>
                    <span className="text-sm font-medium text-red-500">$3,500</span>
                  </div>
                </div>
                <p className="text-sm text-gray-500 mt-4">
                  ¿Notaste los duplicados? La mayoría no los ve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-6xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold mb-6">
               Así funcionará Chequealo
             </h2>
             <p className="text-xl opacity-90 max-w-3xl mx-auto">
               Cuando esté listo, subirás tu resumen y en segundos te mostraremos exactamente qué está mal. 
               Sin vueltas, sin complicaciones.
             </p>
           </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">📸</span>
              </div>
               <h3 className="text-xl font-semibold mb-4">1. Subirás tu resumen</h3>
               <p className="opacity-90">
                 Foto o PDF de tu resumen de tarjeta. Funcionará con Galicia, ICBC y más bancos.
               </p>
             </div>

             <div className="text-center">
               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-3xl">🤖</span>
               </div>
               <h3 className="text-xl font-semibold mb-4">2. IA lo analizará</h3>
               <p className="opacity-90">
                 Nuestra inteligencia artificial detectará duplicados, errores y patrones sospechosos.
               </p>
             </div>

             <div className="text-center">
               <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                 <span className="text-3xl">💡</span>
               </div>
               <h3 className="text-xl font-semibold mb-4">3. Te mostraremos todo</h3>
               <p className="opacity-90">
                 Reporte claro con duplicados resaltados en rojo y explicaciones de cada problema.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              ¿Qué detectamos exactamente?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nuestro sistema identifica los errores más comunes que te cuestan dinero.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-red-50 border border-red-100">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Duplicados</h3>
              <p className="text-sm text-gray-600">
                Cargos idénticos en el mismo período
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-orange-50 border border-orange-100">
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Cuotas mal aplicadas</h3>
              <p className="text-sm text-gray-600">
                Te cobran todas las cuotas juntas
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-yellow-50 border border-yellow-100">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Suscripciones ocultas</h3>
              <p className="text-sm text-gray-600">
                Servicios que olvidaste cancelar
              </p>
            </div>

            <div className="text-center p-6 rounded-2xl bg-purple-50 border border-purple-100">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Errores de comercio</h3>
              <p className="text-sm text-gray-600">
                Cargos incorrectos o excesivos
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
               Así funcionará en la práctica
             </h2>
             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               Ve cómo Chequealo identificará problemas en tu resumen de forma clara y visual.
             </p>
           </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h4 className="font-semibold text-gray-900 mb-4">Resumen original</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Netflix</span>
                    <span className="text-sm">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Netflix</span>
                    <span className="text-sm">$1,200</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                    <span className="text-sm">Gym XYZ</span>
                    <span className="text-sm">$3,500</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200">
                <h4 className="font-semibold text-gray-900 mb-4">Con Chequealo</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-200">
                    <span className="text-sm">Netflix</span>
                    <span className="text-sm text-red-600 font-medium">$1,200 ⚠️ DUPLICADO</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded border border-red-200">
                    <span className="text-sm">Netflix</span>
                    <span className="text-sm text-red-600 font-medium">$1,200 ⚠️ DUPLICADO</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded border border-green-200">
                    <span className="text-sm">Gym XYZ</span>
                    <span className="text-sm text-green-600">$3,500 ✅ OK</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800 font-medium">
                    💰 Ahorro potencial: $1,200
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-16">
             ¿Por qué sumarte a la waitlist?
           </h2>

           <div className="grid md:grid-cols-3 gap-8 mb-16">
             <div className="bg-gray-50 rounded-2xl p-8">
               <div className="text-4xl mb-4">🚀</div>
               <p className="text-gray-700 mb-4">
                 <strong>Acceso anticipado:</strong> Sé de los primeros en probar Chequealo 
                 cuando esté listo y obtén beneficios exclusivos.
               </p>
             </div>

             <div className="bg-gray-50 rounded-2xl p-8">
               <div className="text-4xl mb-4">💡</div>
               <p className="text-gray-700 mb-4">
                 <strong>Validá tu idea:</strong> Ayudanos a entender mejor qué necesitás 
                 para que Chequealo sea perfecto para vos.
               </p>
             </div>

             <div className="bg-gray-50 rounded-2xl p-8">
               <div className="text-4xl mb-4">💰</div>
               <p className="text-gray-700 mb-4">
                 <strong>Ahorrá dinero:</strong> Cuando esté listo, podrás detectar 
                 duplicados y errores que te están costando dinero.
               </p>
             </div>
           </div>

           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
             <h3 className="text-2xl font-bold mb-4">¿Listo para ser de los primeros?</h3>
             <p className="text-xl opacity-90 mb-6">
               Sumate a la waitlist y sé notificado cuando lancemos Chequealo. 
               Los primeros usuarios tendrán beneficios exclusivos.
             </p>
             <FormSubmit />
           </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center">
           <h2 className="text-2xl font-bold text-gray-900 mb-8">¿Por qué sumarte a la waitlist?</h2>
           <div className="grid md:grid-cols-3 gap-8">
             <div className="flex flex-col items-center">
               <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                 <span className="text-2xl">🚀</span>
               </div>
               <h3 className="text-lg font-semibold text-gray-900 mb-2">Acceso Anticipado</h3>
               <p className="text-gray-600 text-sm">
                 Sé de los primeros en probar Chequealo
               </p>
             </div>

             <div className="flex flex-col items-center">
               <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                 <span className="text-2xl">🇦🇷</span>
               </div>
               <h3 className="text-lg font-semibold text-gray-900 mb-2">Hecho en Argentina</h3>
               <p className="text-gray-600 text-sm">
                 Desarrollado para bancos argentinos
               </p>
             </div>

             <div className="flex flex-col items-center">
               <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                 <span className="text-2xl">🔒</span>
               </div>
               <h3 className="text-lg font-semibold text-gray-900 mb-2">100% Seguro</h3>
               <p className="text-gray-600 text-sm">
                 No guardamos tus datos bancarios
               </p>
             </div>
           </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center text-sm text-gray-500 bg-white">
        Hecho con 💙 por{" "}
        <Link
          href={"https://www.linkedin.com/in/hiroshidev/"}
          className="italic underline hover:text-blue-600 transition"
          target="_blank"
          rel="noopener noreferrer"
        >
          Hiroshidev
        </Link>{" "}
        | © 2025 Chequealo
      </footer>
    </main>
  );
};

export default NewLandingPage;
