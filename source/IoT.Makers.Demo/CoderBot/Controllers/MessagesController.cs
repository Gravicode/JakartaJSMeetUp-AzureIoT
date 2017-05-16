using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using Microsoft.Bot.Connector;
using Newtonsoft.Json;
using Microsoft.Bot.Builder.Dialogs;
using CSScriptLibrary;

namespace CoderBot
{
    [BotAuthentication]
    public class MessagesController : ApiController
    {
        public enum TextMode
        {
            SingleCode, BulkMode, Idle
        }
        public static TextMode ScriptMode { set; get; } = TextMode.Idle;
      
        public MessagesController()
        {
            
        }
        /// <summary>
        /// POST: api/Messages
        /// Receive a message from a user and reply to it
        /// </summary>
        public async Task<HttpResponseMessage> Post([FromBody]Activity activity)
        {
            if (activity != null)
            {
                // one of these will have an interface and process it
                if (activity.GetActivityType() == ActivityTypes.Message)
                {
                    var Message = "you type nothing...";
                    ConnectorClient connector = new ConnectorClient(new Uri(activity.ServiceUrl));
                    // calculate something for us to return
                    int length = (activity.Text ?? string.Empty).Length;
                    if (length > 0){
                        switch (activity.Text)
                        {
                            case "help":
                                Message = "Please type : \r\n 'reset': reset code, \r\n 'code' : start coding mode, \r\n 'endcode' : leaving coding mode, \r\n 'happy coding with me, coder bot'";
                                break;
                            case "code":
                                ScriptMode = TextMode.SingleCode;
                                 Message = "Start type a C# code boss...";
                                break;
                            case "endcode":
                                ScriptMode = TextMode.Idle;
                                Message = "leaving code mode...";
                                break;
                            case "bulk":
                                ScriptMode = TextMode.BulkMode;
                                Message = "Start C# bulk mode boss...";
                                break;
                            case "reset":
                                CSScript.Evaluator.Reset();
                                Message = "restarting script engine...";
                                break;
                            default:
                                if (ScriptMode == TextMode.SingleCode)
                                {
                                    try
                                    {
                                        if (activity.Text.StartsWith("print:"))
                                        {
                                            var strCode = activity.Text.Replace("print:", "");
                                            Message = CSScript.Evaluator.Evaluate(strCode).ToString();
                                        }
                                        else
                                        {

                                            CSScript.Evaluator.Run(activity.Text);
                                            Message = "code accepted";

                                        }
                                    }
                                    catch (Exception ex)
                                    {
                                        Message = ex.Message;
                                    }
                                }else if (ScriptMode == TextMode.BulkMode)
                                {
                                    if (activity.Text.StartsWith("print:"))
                                    {
                                        var strCode = activity.Text.Replace("print:", "");
                                        Message = CSScript.Evaluator.Evaluate(strCode).ToString();
                                    }
                                    else
                                    {
                                        dynamic script = CSScript.Evaluator.LoadCode(activity.Text);
                                        Console.WriteLine(script.GetType().Name);
                                        //int result = script.Sum(1, 2);
                                    }
                                }
                                else
                                {
                                    Message = "code mode is not started, please type 'help'";
                                }
                                break;
                        }
                    }
                   
                    Activity reply = activity.CreateReply(Message);
                    await connector.Conversations.ReplyToActivityAsync(reply);

                    // return our reply to the user
                    //Activity reply = activity.CreateReply($"You sent {activity.Text} which was {length} characters");
                    //await connector.Conversations.ReplyToActivityAsync(reply);

                }
                else
                {
                    HandleSystemMessage(activity);
                }
            }
            var response = Request.CreateResponse(HttpStatusCode.OK);
            return response;
        }

        private Activity HandleSystemMessage(Activity message)
        {
            if (message.Type == ActivityTypes.DeleteUserData)
            {
                // Implement user deletion here
                // If we handle user deletion, return a real message
            }
            else if (message.Type == ActivityTypes.ConversationUpdate)
            {
                // Handle conversation state changes, like members being added and removed
                // Use Activity.MembersAdded and Activity.MembersRemoved and Activity.Action for info
                // Not available in all channels
            }
            else if (message.Type == ActivityTypes.ContactRelationUpdate)
            {
                // Handle add/remove from contact lists
                // Activity.From + Activity.Action represent what happened
            }
            else if (message.Type == ActivityTypes.Typing)
            {
                // Handle knowing tha the user is typing
            }
            else if (message.Type == ActivityTypes.Ping)
            {
            }

            return null;
        }
    }
}