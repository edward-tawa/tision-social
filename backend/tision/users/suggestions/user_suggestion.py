from users.models.user_model import User

def users_related_by_education():
    """
    Build a mapping of educational institutions to users who studied there.

    Uses Django ORM's prefetch_related to efficiently fetch all education
    records for users, avoiding N+1 queries.

    Returns:
        dict: A dictionary where keys are institution names (str) and values
              are lists of User instances who attended that institution.

    Example:
        {
            "MIT": [<User: Alice>, <User: Bob>],
            "Harvard": [<User: Charlie>]
        }

    Notes:
        - Users who attended multiple institutions will appear under each relevant key.
        - The function converts internal sets to lists for API/JSON-friendly output.
    """
    users = User.objects.prefetch_related('education').all()
    education_institution_to_users_map = {}

    for user in users:
        for edu in user.education.all():
            institution = edu.institution
            if institution not in education_institution_to_users_map:
                education_institution_to_users_map[institution] = set()
            education_institution_to_users_map[institution].add(user)

    return {inst: list(users) for inst, users in education_institution_to_users_map.items()}


def users_related_by_experience():
    """
    Build a mapping of companies to users who have experience working there.

    Uses Django ORM's prefetch_related to efficiently fetch all experience
    records for users, avoiding N+1 queries.

    Returns:
        dict: A dictionary where keys are company names (str) and values
              are lists of User instances who have worked at that company.

    Example:
        {
            "Google": [<User: Alice>, <User: Bob>],
            "Microsoft": [<User: Charlie>]
        }

    Notes:
        - Users who have worked at multiple companies will appear under each relevant key.
        - The function converts internal sets to lists for API/JSON-friendly output.
    """
    users = User.objects.prefetch_related('experience').all()
    company_to_users_map = {}

    for user in users:
        for experience in user.experience.all():
            company = experience.company
            if company not in company_to_users_map:
                company_to_users_map[company] = set()
            company_to_users_map[company].add(user)

    return {company: list(users) for company, users in company_to_users_map.items()}
