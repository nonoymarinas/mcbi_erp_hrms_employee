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

        public Task<ReturnGetSigninStatusModel> GetSigninStatus()
        {
            _signinData.Salt = RandomString(6);
            var saltedPassword = _signinData.IStillLoveYou + RandomString(6);

            var saltedPasswordBytes = Encoding.ASCII.GetBytes(saltedPassword);

            var sha = SHA512Managed.Create();

            var hashSaltedPassword = sha.ComputeHash(saltedPasswordBytes);

            _signinData.HashSaltedIStillLoveYou = GetStringFromHash(hashSaltedPassword);

            SaveSigninDataAccess dataAccess = new SaveSigninDataAccess(_connection, _signinData);

            return dataAccess.GetSigninStatus();
        }

        public Task<ReturnGetSigninStatusModel> SaveSigninData()
        {
            _signinData.Salt = RandomString(6);
            var saltedPassword = _signinData.IStillLoveYou + RandomString(6);

            var saltedPasswordBytes = Encoding.ASCII.GetBytes(saltedPassword);

            var sha = SHA512Managed.Create();

            var hashSaltedPassword = sha.ComputeHash(saltedPasswordBytes);

            _signinData.HashSaltedIStillLoveYou = GetStringFromHash(hashSaltedPassword);

            SaveSigninDataAccess dataAccess = new SaveSigninDataAccess(_connection, _signinData);

            return dataAccess.GetSigninStatus();
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
        private string RandomString(int size)
        {
            StringBuilder builder = new StringBuilder();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }

            return builder.ToString();
        }

    }
}
