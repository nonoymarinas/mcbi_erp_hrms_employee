using System;
using System.Security.Cryptography;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using BusinessModel;
using DataAccess;

namespace BusinessLogic
{
	public class SiginLogic : ISigninStatus
	{
		private readonly ConnectionSettings _connection;
        private readonly ParamSignInUsernameAndPasswordModels? _signinData;
        private static Random random = new Random((int)DateTime.Now.Ticks);

        public SiginLogic(IOptions<ConnectionSettings> connection, ParamSignInUsernameAndPasswordModels signinData)
        {
            _connection = connection.Value;
            _signinData = signinData;
        }

       async public Task<bool> IsLoginDataValid()
        {

            //checked if username exist
            ReturnGetSigninDataModel dataAccessData = await GetSigninStatus();

            if (!dataAccessData.IsUsernameExist)
            {
                return false;
            }

            var hashIPasswordWithSaltFormDB = dataAccessData.HashIStillLoveYouWithSalt;
            var saltFromDB = dataAccessData.Salt;

            var passwordFromUser = _signinData.IStillLoveYou;

            var stringPasswordPlusSalt = passwordFromUser + saltFromDB;

            var sha = SHA512Managed.Create();

            var hashPasswordWithSaltBtyes = Encoding.ASCII.GetBytes(stringPasswordPlusSalt);

            var hashSaltedPassword = sha.ComputeHash(hashPasswordWithSaltBtyes);

            var hashStringFormatFromPasswordWithSalt = GetStringFromHash(hashSaltedPassword);


            //Comparer the 2 hashPasswordString
            if(hashStringFormatFromPasswordWithSalt!= hashIPasswordWithSaltFormDB)
            {
                return false;
            }
            
            return true;
        }

        async private Task<ReturnGetSigninDataModel> GetSigninStatus()
        {

            GetSigninDataAccess dataAccess = new GetSigninDataAccess(_connection, _signinData);
            return await dataAccess.GetSigninStatus();
        }

        

        private static string GetStringFromHash(byte[] hash)
        {
            StringBuilder result = new StringBuilder();
            for (int i = 0; i < hash.Length; i++)
            {
                result.Append(hash[i].ToString("X2"));
            }
            return result.ToString();
        }


        //private string RandomString(int size)
        //{
        //    StringBuilder builder = new StringBuilder();
        //    char ch;
        //    for (int i = 0; i < size; i++)
        //    {
        //        ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
        //        builder.Append(ch);
        //    }

        //    return builder.ToString();
        //}

    }
}
