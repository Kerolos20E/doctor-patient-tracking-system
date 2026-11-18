using System.Linq.Expressions;

namespace DoctorPatientTracking.Domain.Abstractions.Specifications
{
    public abstract class BaseSpecification<TEntity> : ISpecification<TEntity> where TEntity : class
    {
        #region Where

        public Expression<Func<TEntity, bool>>? WhereExpression { get; private set; }

        protected BaseSpecification(Expression<Func<TEntity, bool>>? whereExpression)
            => WhereExpression = whereExpression;

        #endregion Where

        #region Include

        public List<Expression<Func<TEntity, object>>> IncludexExpressions { get; private set; } = new();

        public void AddIncluding(Expression<Func<TEntity, object>> expression)
            => IncludexExpressions.Add(expression);

        #endregion Include

        #region Sorted

        public Expression<Func<TEntity, object>> OrderedByExpression { get; private set; }
        public Expression<Func<TEntity, object>> OrderedByDescExpression { get; private set; }
        public Expression<Func<TEntity, object>>? ThenByDescExpression { get; private set; }
        public Expression<Func<TEntity, object>>? ThenByAscExpression { get; private set; }

        public void AddOrder(Expression<Func<TEntity, object>> expression) => OrderedByExpression = expression;

        public void AddOrderDesc(Expression<Func<TEntity, object>> expression) => OrderedByDescExpression = expression;

        public void AddThenByDesc(Expression<Func<TEntity, object>> expression) => ThenByDescExpression = expression;

        public void AddThenByAsc(Expression<Func<TEntity, object>> expression) => ThenByAscExpression = expression;

        #endregion Sorted

        #region Pagenation

        public int Take { get; private set; }
        public int Skip { get; private set; }
        public bool IsPagenation { get; private set; }
        private const int MaxPageSize = 10;

        public void ApplyPagenation(int? pageNumber, int? pageSize)
        {
            if (!pageNumber.HasValue || pageNumber <= 0) pageNumber = 1;
            if (!pageSize.HasValue || pageSize <= 10 || pageSize > MaxPageSize) pageSize = MaxPageSize;
            IsPagenation = true;
            Skip = (pageNumber.Value - 1) * pageSize.Value;
            Take = pageSize.Value;
        }

        #endregion Pagenation
    }
}