
        //Person class
        //Save the person details using DI

        //Client
        class ClassCLient{
            constructor(person, personDataManager){
                this.Person = person;
                this.PersonDataManager = personDataManager;
            }

            SavePerson(){
                if(this.PersonDataManager) this.PersonDataManager.SavePerson(this.Person);
            }
        }

        //Service
        class ServiceA{
            constructor(){

            }

            SavePerson(person){
                console.log("Person Details Saved to a text file.")
            }
        }

        class ServiceB{
            constructor(){

            }

            SavePerson(person){
                console.log("Person Details Saved to a xml file.")
            }
        }

        class ServiceC{
            constructor(){

            }

            SavePerson(person){
                console.log("Person Details Saved to a sql db.")
            }
        }

        var services = {};
        services['ServiceA'] = ServiceA;
        services['ServiceB'] = ServiceB;
        services['ServiceC'] = ServiceC;

        window['Services'] = services;

        document.addEventListener('DOMContentLoaded', SavePerson);
        async function SavePerson(){
            var personDataManagerTypeString = await GetServiceType();

            var service = new window.Services[personDataManagerTypeString];
            var person = new Person('John', 'Doe');

            if(service){
                var client = new ClassCLient(person, service);
                client.SavePerson();
            }
            
        }

        async function GetServiceType(){
            var personDataManagerTypeString;
            var response = await fetch('config.txt');
            var personDataManagerTypeObj = await response.json();
            personDataManagerTypeString = personDataManagerTypeObj.Type;
            return personDataManagerTypeString;
        }

        class Person{
            constructor(firstName, lastName){
                this.FirstName = firstName || '';
                this.LastName = lastName || '';
            }
        }
