# Custom Rules

## Explicit Validation Request
L'utilisateur a demandé que les plans d'implémentation nécessitent toujours une validation explicite de sa part, même s'il a activé une politique de validation automatique (Auto-Approval) globale dans le système Antigravity.
Par conséquent :
- Lorsque tu présentes un plan d'implémentation (via l'artefact `implementation_plan.md`), NE TE CONTENTE PAS du feu vert automatique du système.
- Ajoute explicitement dans ta réponse textuelle : "Veuillez me confirmer par un message écrit que vous validez ce plan avant que je ne commence."
- Refuse d'exécuter le plan tant que l'utilisateur n'a pas répondu "ok", "vas-y", ou tout autre message confirmant son accord, MÊME SI l'événement "auto-approved" est déclenché.
