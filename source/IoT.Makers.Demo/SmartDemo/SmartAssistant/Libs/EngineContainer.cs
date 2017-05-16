using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

//DI
namespace SmartAssistant
{
    public class EngineContainer
    {

        private readonly Dictionary<Type, object> ObjectContainer
                       = new Dictionary<Type, object>();

        public void Register<T>(object Obj)
        {
            if (!ObjectContainer.ContainsKey(typeof(T)))
            {
                ObjectContainer.Add(typeof(T), Obj);
            }
        }

        public T GetApi<T>()
        {
            if (ObjectContainer.ContainsKey(typeof(T)))
            {
                return (T)ObjectContainer[typeof(T)];
            }
            return default(T);
        }

       
    }
}
